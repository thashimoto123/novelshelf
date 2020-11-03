import { firestore } from 'firebase-admin';

export type Novel = {
  id?: string;
  site: string | null;
  url: string | null;
  title: string | null;
  author: string | null;
  authorUrl: string | null;
  genre: string[];
  originalGenre: string[];
  story: string | null;
  createdAt: firestore.Timestamp | null;
  updatedAt: firestore.Timestamp | null;
  fetchedAt: firestore.Timestamp | null;
};

export const blankNovel: Novel = {
  title: null,
  author: null,
  site: null,
  genre: [],
  originalGenre: [],
  story: null,
  url: null,
  authorUrl: null,
  createdAt: null,
  updatedAt: null,
  fetchedAt: null,
};
