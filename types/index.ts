export type VideoStatus =
  | "pending"
  | "transcribing"
  | "summarizing"
  | "generating_image"
  | "done"
  | "error";

export type SessionType = "regular" | "extraordinary" | "committee" | null;

export interface Video {
  id: string;
  youtube_video_id: string;
  title: string;
  channel_id: string;
  published_at: string;
  status: VideoStatus;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  video_id: string;
  title: string | null;
  transcript: string | null;
  summary: string | null;
  infographic_url: string | null;
  thumbnail_url: string | null;
  session_type: SessionType;
  tags: string[] | null;
  processed_at: string | null;
}

export interface ArticleWithVideo extends Article {
  video: Video;
}

export interface GamagoriReference {
  facilities: Array<{
    name: string;
    kana: string;
    variations: string[];
    category: string;
    description?: string;
  }>;
  locations: Array<{
    name: string;
    kana: string;
    variations: string[];
    type: string;
  }>;
  meetingTypes: Array<{
    name: string;
    kana: string;
    variations: string[];
    dbValue: string;
    description: string;
  }>;
  politicalTerms: Array<{
    term: string;
    kana: string;
    variations: string[];
    description: string;
  }>;
  positions: Array<{
    title: string;
    kana: string;
    variations: string[];
    description: string;
  }>;
}
