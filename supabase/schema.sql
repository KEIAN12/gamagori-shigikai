-- 蒲郡市議会わかりやすビューア: 初期スキーマ
-- Supabase SQL Editor で実行

-- 動画 (YouTube 取得分)
create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),
  youtube_video_id text not null unique,
  title text not null,
  channel_id text not null,
  published_at timestamptz not null,
  status text not null default 'pending' check (status in ('pending', 'transcribing', 'summarizing', 'generating_image', 'done', 'error')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_videos_status on public.videos (status);
create index if not exists idx_videos_published_at on public.videos (published_at desc);

-- 記事 (1動画1記事)
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  video_id uuid not null references public.videos (id) on delete cascade,
  title text,
  transcript text,
  summary text,
  infographic_url text,
  thumbnail_url text,
  session_type text check (session_type in ('regular', 'extraordinary', 'committee')),
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (video_id)
);

create index if not exists idx_articles_video_id on public.articles (video_id);
create index if not exists idx_articles_session_type on public.articles (session_type);

-- 議員名簿 (市役所HP参照用・要約時のコンテキスト)
create table if not exists public.council_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  kana text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS: 公開記事は誰でも読める、videos は status=done のものは articles 経由で読む
alter table public.videos enable row level security;
alter table public.articles enable row level security;
alter table public.council_members enable row level security;

create policy "公開記事は誰でも閲覧可"
  on public.articles for select
  using (
    exists (select 1 from public.videos v where v.id = articles.video_id and v.status = 'done')
  );

create policy "videos は done のみ select 可 (記事経由)"
  on public.videos for select
  using (status = 'done');

create policy "council_members は誰でも select 可"
  on public.council_members for select
  using (true);

-- service role で全操作可能のため、管理用は service role キーを使用する

-- ストレージバケット (Supabase ダッシュボードの Storage で作成)
-- 以下は参考用のSQL。ダッシュボードから作成してください。
--
-- insert into storage.buckets (id, name, public) values ('infographics', 'infographics', true);
-- insert into storage.buckets (id, name, public) values ('thumbnails', 'thumbnails', true);
--
-- create policy "infographics公開読み取り" on storage.objects for select using (bucket_id = 'infographics');
-- create policy "thumbnails公開読み取り" on storage.objects for select using (bucket_id = 'thumbnails');

-- 既存テーブルへのカラム追加 (既にテーブルがある場合)
-- alter table public.articles add column if not exists title text;
-- alter table public.articles add column if not exists thumbnail_url text;
-- alter table public.articles add column if not exists tags text[];

-- タグカラム追加
alter table public.articles add column if not exists tags text[];
create index if not exists idx_articles_tags on public.articles using gin (tags);
