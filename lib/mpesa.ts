const BASE_URL =
  process.env.MPESA_ENV === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke";

// ─── Phone formatting ─────────────────────────────────────────────────────────

/** Normalises a Kenyan phone number to E.164 (254XXXXXXXXX). */
export function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("254") && digits.length === 12) return digits;
  if (digits.startsWith("0") && digits.length === 10) return "254" + digits.slice(1);
  if ((digits.startsWith("7") || digits.startsWith("1")) && digits.length === 9)
    return "254" + digits;
  throw new Error(`Invalid Kenyan phone number: ${raw}`);
}

// ─── OAuth token cache ────────────────────────────────────────────────────────

let tokenCache: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (tokenCache && Date.now() < tokenCache.expiresAt) {
    return tokenCache.token;
  }

  const key = process.env.MPESA_CONSUMER_KEY!;
  const secret = process.env.MPESA_CONSUMER_SECRET!;
  const credentials = Buffer.from(`${key}:${secret}`).toString("base64");

  const res = await fetch(
    `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
    { headers: { Authorization: `Basic ${credentials}` } }
  );

  if (!res.ok) {
    throw new Error(`M-Pesa OAuth failed: ${res.status} ${await res.text()}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: string };
  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + (parseInt(data.expires_in, 10) - 60) * 1000,
  };
  return tokenCache.token;
}

// ─── STK Push ─────────────────────────────────────────────────────────────────

export type StkResult =
  | { ok: true; checkoutRequestId: string; merchantRequestId: string }
  | { ok: false; errorCode: string; errorMessage: string };

export async function initiateStk({
  phone,
  amount,
  accountRef,
  description,
}: {
  phone: string;
  amount: number;
  accountRef: string;
  description: string;
}): Promise<StkResult> {
  try {
    const token = await getAccessToken();
    const shortcode = process.env.MPESA_SHORTCODE!;
    const passkey = process.env.MPESA_PASSKEY!;

    const timestamp = new Date()
      .toISOString()
      .replace(/[-T:.Z]/g, "")
      .slice(0, 14);
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

    const res = await fetch(`${BASE_URL}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Math.ceil(amount),
        PartyA: phone,
        PartyB: shortcode,
        PhoneNumber: phone,
        CallBackURL: `${process.env.MPESA_CALLBACK_URL}/api/mpesa/callback`,
        AccountReference: accountRef.slice(0, 12),
        TransactionDesc: description.slice(0, 13),
      }),
    });

    const data = (await res.json()) as Record<string, string>;

    if (data.ResponseCode === "0") {
      return {
        ok: true,
        checkoutRequestId: data.CheckoutRequestID,
        merchantRequestId: data.MerchantRequestID,
      };
    }

    return {
      ok: false,
      errorCode: data.errorCode ?? data.ResponseCode ?? "UNKNOWN",
      errorMessage: data.errorMessage ?? data.ResponseDescription ?? "STK Push failed",
    };
  } catch (err) {
    return {
      ok: false,
      errorCode: "FETCH_ERROR",
      errorMessage: err instanceof Error ? err.message : "Network error",
    };
  }
}
