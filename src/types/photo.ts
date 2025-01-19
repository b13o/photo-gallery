// 基本的な写真の型
interface BasicPhoto {
  id: string;
  urls: {
    regular: string;
  };
  alt_description: string | null;
}

// 検索時のレスポンスの型
interface SearchPhoto {
  total: number;
  total_pages: number;
  results: Array<BasicPhoto>;
}

// 詳細情報を含む写真の型
interface DetailePhoto extends BasicPhoto {
  tags: Array<{ title: string }>;
  downloads: number;
  likes: number;
  description: string | null;
  location: {
    country: string | null;
  };
  user: {
    username: string;
  };
}

export type { BasicPhoto, SearchPhoto, DetailePhoto };
