"use client";

import { assignAgent, updateRequestStatus } from "@/app/actions";
import { useState } from "react";

interface AdminActionsProps {
  requestId: string;
  currentStatus: string;
  agents: { id: string; fullName: string }[];
}

export function AdminActions({ requestId, currentStatus, agents }: AdminActionsProps) {
  const [loading, setLoading] = useState(false);

  const handleAssign = async (agentId: string) => {
    setLoading(true);
    await assignAgent(requestId, agentId);
    setLoading(false);
  };

  const handleStatusChange = async (status: string) => {
    setLoading(true);
    await updateRequestStatus(
      requestId,
      status as "PENDING" | "ASSIGNED" | "COMPLETED" | "CANCELLED"
    );
    setLoading(false);
  };

  if (loading) return <span className="text-xs text-slate-400">Updating...</span>;

  return (
    <div className="flex gap-2 items-center">
      {currentStatus === "PENDING" && (
        <select
          onChange={(e) => {
            if (e.target.value) handleAssign(e.target.value);
          }}
          className="text-xs border border-slate-300 rounded px-2 py-1"
          defaultValue=""
        >
          <option value="" disabled>
            Assign agent
          </option>
          {agents.map((a) => (
            <option key={a.id} value={a.id}>
              {a.fullName}
            </option>
          ))}
        </select>
      )}
      {currentStatus !== "COMPLETED" && currentStatus !== "CANCELLED" && (
        <select
          onChange={(e) => {
            if (e.target.value) handleStatusChange(e.target.value);
          }}
          className="text-xs border border-slate-300 rounded px-2 py-1"
          defaultValue=""
        >
          <option value="" disabled>
            Update status
          </option>
          <option value="PENDING">Pending</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      )}
    </div>
  );
}
