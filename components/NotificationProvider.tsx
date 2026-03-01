"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";

const clientMessages: Record<string, { message: string; type: "success" | "error" | "info" }> = {
  ASSIGNED: { message: "An agent has been assigned to your request.", type: "info" },
  COMPLETED: { message: "Your inspection is complete — view the report.", type: "success" },
  CANCELLED: { message: "A service request has been cancelled.", type: "error" },
};

const agentMessages: Record<string, { message: string; type: "success" | "error" | "info" }> = {
  ASSIGNED: { message: "You have been assigned a new inspection request.", type: "info" },
  COMPLETED: { message: "Inspection marked as completed.", type: "success" },
  CANCELLED: { message: "An assigned request has been cancelled.", type: "error" },
};

interface NotificationProviderProps {
  userId: string;
  /** Which column to filter on. "userId" for clients, "agentId" for agents. */
  filterField?: "userId" | "agentId";
}

export function NotificationProvider({
  userId,
  filterField = "userId",
}: NotificationProviderProps) {
  useEffect(() => {
    const supabase = createClient();
    const messages = filterField === "agentId" ? agentMessages : clientMessages;

    const channel = supabase
      .channel(`request-updates-${filterField}-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "ServiceRequest",
          filter: `${filterField}=eq.${userId}`,
        },
        (payload) => {
          const newStatus = payload.new.status as string;
          const info = messages[newStatus];
          if (info) {
            toast[info.type](info.message);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, filterField]);

  return null;
}
