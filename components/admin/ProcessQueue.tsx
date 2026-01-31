"use client";

import { useEffect, useState } from "react";

type PendingVideo = {
  id: string;
  youtube_video_id: string;
  title: string;
  status: string;
};

export function ProcessQueue({ className }: { className?: string }) {
  const [list, setList] = useState<PendingVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/videos?status=pending,transcribing,summarizing,generating_image");
      const data = await res.json();
      setList(data.videos ?? []);
    } catch {
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const startProcess = async (videoId: string) => {
    setProcessing(videoId);
    try {
      const res = await fetch(`/api/process/${videoId}`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "処理の開始に失敗しました");
      await load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "処理の開始に失敗しました");
    } finally {
      setProcessing(null);
    }
  };

  if (loading) return <p className={className}>読み込み中…</p>;
  if (list.length === 0) {
    return (
      <p className={`${className} text-gray-600`}>
        処理待ちの動画はありません。
      </p>
    );
  }

  return (
    <ul className={`${className} space-y-2`}>
      {list.map((v) => (
        <li
          key={v.id}
          className="flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
        >
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-gray-900">{v.title}</p>
            <p className="text-xs text-gray-500">{v.status}</p>
          </div>
          <button
            type="button"
            onClick={() => startProcess(v.id)}
            disabled={!!processing}
            className="btn-primary ml-4 shrink-0 disabled:opacity-50"
          >
            {processing === v.id ? "処理中…" : "処理開始"}
          </button>
        </li>
      ))}
    </ul>
  );
}
