"use client";

import { useState } from "react";

export function VideoFetchButton({ className }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleFetch = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/videos", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "取得に失敗しました");
      setMessage(data.message ?? "取得を開始しました。");
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleFetch}
        disabled={loading}
        className="btn-primary disabled:opacity-50"
      >
        {loading ? "取得中…" : "今すぐ新着動画を取得"}
      </button>
      {message && (
        <p className="mt-2 text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
}
