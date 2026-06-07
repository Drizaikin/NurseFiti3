"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Notification {
  id: string;
  type: string;
  title: string;
  body: string;
  action_url: string | null;
  is_read: boolean;
  is_broadcast: boolean;
  created_at: string;
}

function relativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

// ─── Notification type icon ───────────────────────────────────────────────────

function NotifIcon({ type, isBroadcast }: { type: string; isBroadcast: boolean }) {
  const base = "w-4 h-4 flex-shrink-0";
  if (isBroadcast) {
    return (
      <svg className={`${base} text-amber-500`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    );
  }
  if (type === "session_confirmed" || type === "new_booking") {
    return (
      <svg className={`${base} text-success`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    );
  }
  if (type === "meet_link_added") {
    return (
      <svg className={`${base} text-primary`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    );
  }
  return (
    <svg className={`${base} text-primary`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    </svg>
  );
}

// ─── Single notification row ──────────────────────────────────────────────────

function NotifRow({
  notif,
  isExpanded,
  onToggleExpand,
  onMarkRead,
}: {
  notif: Notification;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onMarkRead: () => void;
}) {
  const isLong = notif.body.length > 100;

  return (
    <li className="border-b border-[var(--color-border)] last:border-0">
      <div
        className={`px-4 py-3 transition-colors flex gap-3 items-start ${
          !notif.is_read ? "bg-primary/[0.03]" : ""
        }`}
      >
        {/* Unread dot */}
        <div className="flex-shrink-0 mt-1 w-1.5">
          {!notif.is_read && (
            <span className="block w-1.5 h-1.5 rounded-full bg-primary mt-1" />
          )}
        </div>

        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          <NotifIcon type={notif.type} isBroadcast={notif.is_broadcast} />
        </div>

        {/* Text + actions */}
        <div className="flex-1 min-w-0">
          {/* Clickable title area */}
          <button
            onClick={onMarkRead}
            className="w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded"
          >
            <p className={`text-sm text-[var(--color-text)] leading-snug ${!notif.is_read ? "font-semibold" : "font-medium"}`}>
              {notif.title}
            </p>
          </button>

          {/* Body — clamps unless expanded */}
          <p className={`text-xs text-[var(--color-text-secondary)] mt-0.5 leading-relaxed ${isExpanded ? "" : "line-clamp-2"}`}>
            {notif.body}
          </p>

          <div className="flex items-center justify-between mt-1.5 gap-2">
            <p className="text-[10px] text-[var(--color-text-secondary)] opacity-70">
              {relativeTime(notif.created_at)}
            </p>

            {/* Expand/collapse toggle — only shown when body is long */}
            {isLong && (
              <button
                onClick={onToggleExpand}
                className="text-[10px] font-semibold text-primary hover:text-primary/80 transition-colors flex-shrink-0"
              >
                {isExpanded ? "Show less ↑" : "Read more ↓"}
              </button>
            )}
          </div>

          {/* Action link */}
          {notif.action_url && (
            <button
              onClick={onMarkRead}
              className="mt-1.5 text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
            >
              View →
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface NotificationsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

// ─── Main dropdown component ──────────────────────────────────────────────────

export default function NotificationsPanel({
  isOpen,
  onClose,
  userId,
}: NotificationsPanelProps) {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);           // panel-level expand
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set()); // per-item expand
  const supabase = createClient();
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  async function fetchNotifications() {
    if (!userId) return;
    setLoading(true);
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(50);
    setNotifications((data ?? []) as Notification[]);
    setLoading(false);
  }

  async function markAsRead(notif: Notification) {
    if (!notif.is_read) {
      await (supabase as any)
        .from("notifications")
        .update({ is_read: true })
        .eq("id", notif.id)
        .eq("user_id", userId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notif.id ? { ...n, is_read: true } : n))
      );
    }
    if (notif.action_url) {
      onClose();
      router.push(notif.action_url);
    }
  }

  async function markAllRead() {
    await (supabase as any)
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", userId)
      .eq("is_read", false);
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  }

  function toggleItemExpand(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  // Reset expand state when closed
  useEffect(() => {
    if (!isOpen) {
      setExpanded(false);
      setExpandedIds(new Set());
    }
  }, [isOpen]);

  // Fetch + realtime when opened
  useEffect(() => {
    if (!isOpen || !userId) return;
    fetchNotifications();

    const channel = supabase
      .channel(`notifications-panel-${userId}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "notifications",
        filter: `user_id=eq.${userId}`,
      }, (payload) => {
        setNotifications((prev) => [payload.new as Notification, ...prev]);
      })
      .subscribe();

    channelRef.current = channel;
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, userId]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const t = setTimeout(() => document.addEventListener("mousedown", handler), 50);
    return () => { clearTimeout(t); document.removeEventListener("mousedown", handler); };
  }, [isOpen, onClose]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  const hasUnread = notifications.some((n) => !n.is_read);
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  if (!isOpen) return null;

  // Panel dimensions — compact vs expanded
  const panelWidth = expanded ? "w-[min(560px,95vw)]" : "w-80 sm:w-96";
  const panelMaxH = expanded ? "max-h-[80vh]" : "max-h-[min(480px,80vh)]";

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Notifications"
      className={`absolute right-0 top-full mt-2 ${panelWidth} bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-200`}
      style={{ maxHeight: expanded ? "80vh" : "min(480px, 80vh)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] flex-shrink-0">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-[var(--color-text)]">Notifications</h2>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold leading-none">
              {unreadCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1">
          {hasUnread && (
            <button
              onClick={markAllRead}
              className="text-xs text-primary hover:text-primary/80 transition-colors font-medium px-2 py-1 rounded-lg hover:bg-primary/5"
            >
              Mark all read
            </button>
          )}

          {/* Expand / collapse panel toggle */}
          <button
            onClick={() => setExpanded((e) => !e)}
            aria-label={expanded ? "Collapse panel" : "Expand panel"}
            title={expanded ? "Collapse" : "Expand to read more"}
            className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors"
          >
            {expanded ? (
              /* collapse icon — arrows pointing inward */
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9L4 4m0 0v4m0-4h4M15 9l5-5m0 0v4m0-4h-4M9 15l-5 5m0 0v-4m0 4h4M15 15l5 5m0 0v-4m0 4h-4" />
              </svg>
            ) : (
              /* expand icon — arrows pointing outward */
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5M20 8V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5M20 16v4m0 0h-4m4 0l-5-5" />
              </svg>
            )}
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close notifications"
            className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg)] transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content — scrollable */}
      <div className="overflow-y-auto flex-1">
        {loading ? (
          <div className="flex items-center justify-center py-10">
            <svg className="animate-spin h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 gap-2 text-[var(--color-text-secondary)]">
            <svg className="h-8 w-8 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <p className="text-sm">No notifications yet</p>
          </div>
        ) : (
          <ul>
            {notifications.map((notif) => (
              <NotifRow
                key={notif.id}
                notif={notif}
                isExpanded={expanded || expandedIds.has(notif.id)}
                onToggleExpand={() => toggleItemExpand(notif.id)}
                onMarkRead={() => markAsRead(notif)}
              />
            ))}
          </ul>
        )}
      </div>

      {/* Footer hint when compact */}
      {!expanded && notifications.length > 0 && (
        <div className="flex-shrink-0 px-4 py-2 border-t border-[var(--color-border)] text-center">
          <button
            onClick={() => setExpanded(true)}
            className="text-[10px] text-[var(--color-text-secondary)] hover:text-primary transition-colors"
          >
            ↕ Expand to read full notifications
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Unread count hook (used by topbars) ─────────────────────────────────────

export function useUnreadCount(userId: string): number {
  const [count, setCount] = useState(0);
  const supabase = createClient();
  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  useEffect(() => {
    if (!userId) { setCount(0); return; }

    async function fetchCount() {
      const { count: c } = await supabase
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("is_read", false);
      setCount(c ?? 0);
    }

    fetchCount();

    const channel = supabase
      .channel(`unread-count-${userId}`)
      .on("postgres_changes", {
        event: "*",
        schema: "public",
        table: "notifications",
        filter: `user_id=eq.${userId}`,
      }, () => { fetchCount(); })
      .subscribe();

    channelRef.current = channel;
    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
        channelRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return count;
}
