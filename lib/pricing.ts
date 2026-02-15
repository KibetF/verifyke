import { ServiceType } from "@prisma/client";

const BASE_PRICES: Record<ServiceType, number> = {
  QUICK: 3000,
  STANDARD: 8000,
  PREMIUM: 15000,
};

export function getBasePrice(serviceType: ServiceType): number {
  return BASE_PRICES[serviceType];
}

export function getDistanceFee(distanceKm: number): number | "MANUAL" {
  if (distanceKm <= 15) return 0;
  if (distanceKm <= 40) return 1000;
  if (distanceKm <= 80) return 2500;
  return "MANUAL";
}

export function calculateTotal(
  serviceType: ServiceType,
  distanceKm: number
): { basePrice: number; distanceFee: number; totalPrice: number; manualFlag: boolean } {
  const basePrice = getBasePrice(serviceType);
  const fee = getDistanceFee(distanceKm);

  if (fee === "MANUAL") {
    return { basePrice, distanceFee: 0, totalPrice: basePrice, manualFlag: true };
  }

  return {
    basePrice,
    distanceFee: fee,
    totalPrice: basePrice + fee,
    manualFlag: false,
  };
}
