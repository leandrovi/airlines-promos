export interface TweetContent {
  id: string;
  title: string | null;
  extract: string;
  createdAt: Date;
  tweetResultId: string;
}

export interface TweetResult {
  id: string;
  url: string;
  publishedDate: string | null;
  author: string | null;
  score: number;
  createdAt: Date;
  tweetContent: TweetContent;
}

export interface PromotionsResponse {
  statusCode: number;
  data: TweetResult[];
}
