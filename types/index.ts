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
  councilMembers?: Array<{
    name: string;
    kana: string;
    party?: string;
  }>;
}

// 包括的辞書の型定義
export interface ComprehensiveDictionary {
  version: string;
  lastUpdated: string;
  description: string;
  councilMembers: Array<{
    name: string;
    reading: string;
    faction: string;
    seatNumber: number;
    terms: number;
    role?: string;
    variations: string[];
  }>;
  districts: Array<{
    name: string;
    reading: string;
    zipCode: string;
    variations: string[];
  }>;
  facilities: Array<{
    name: string;
    category: string;
    reading: string;
    variations: string[];
  }>;
  committees: Array<{
    name: string;
    type: string;
    reading: string;
    chairperson?: string;
    variations: string[];
  }>;
  factions: Array<{
    name: string;
    shortName: string;
    members: number;
    reading: string;
    variations: string[];
  }>;
  meetingTypes: Array<{
    name: string;
    type: string;
    reading: string;
    description: string;
    variations: string[];
  }>;
  politicalTerms: Array<{
    term: string;
    reading: string;
    description: string;
    variations: string[];
  }>;
  administrativeTerms: Array<{
    term: string;
    reading: string;
    description: string;
    variations: string[];
  }>;
  cityExecutives?: Array<{
    position: string;
    name: string;
    reading: string;
    birthDate?: string;
    termStart: string;
    termNumber: number;
    background?: string;
    variations: string[];
  }>;
}
