import { ProcessQueue } from "@/components/admin/ProcessQueue";
import { VideoFetchButton } from "@/components/admin/VideoFetchButton";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">管理画面</h1>
        <p className="mt-1 text-gray-600">
          動画の取得・処理は Cron で自動実行されます。障害時などに手動で実行できます。
        </p>
      </div>

      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">動画取得</h2>
        <p className="mt-1 text-sm text-gray-600">
          YouTube から蒲郡市議会チャンネルの新着動画を取得します。
        </p>
        <VideoFetchButton className="mt-4" />
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">処理待ち・処理開始</h2>
        <p className="mt-1 text-sm text-gray-600">
          未処理の動画を一覧表示し、手動で処理を開始できます。
        </p>
        <ProcessQueue className="mt-4" />
      </section>
    </div>
  );
}
