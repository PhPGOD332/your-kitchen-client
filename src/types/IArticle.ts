import type { IMeta } from "./IMeta";

export interface IArticle {
  _id: string;
  link: string;
  title: string;
  description: string;
  preview: string;
  content: string;
  onMainPage: boolean;
  viewCount: number;
  author: string;
  createdAt: string;
  updatedAt?: string;
  meta: IMeta;
  slug: string;
}
