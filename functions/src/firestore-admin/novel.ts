import admin from 'firebase-admin';

import { collectionName } from '../services/novelshelf/constants';
import { Novel } from '../services/novelshelf/models/novel';

export const saveNovels = async (
  db: admin.firestore.Firestore,
  novels: Novel[],
  site: string,
) => {
  const collection = db.collection(collectionName.novels);
  const query = await collection.where('site', '==', site).get();
  const exsitingNovels = query.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      } as Required<Novel>),
  );

  const counts = {
    create: 0,
    update: 0,
  };

  for await (const novel of novels) {
    const registerdNovel = exsitingNovels.find(
      (m) => m.title === novel.title && m.author === novel.author,
    );

    if (registerdNovel) {
      const diff: Partial<Novel> = {
        url: novel.url,
        genre: novel.genre,
        originalGenre: novel.originalGenre,
        story: novel.story,
        updatedAt: novel.updatedAt,
      };
      await collection.doc(registerdNovel.id).update({
        ...diff,
        fetchedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      counts.update += 1;
    } else {
      await collection.doc().set({
        ...novel,
        fetchedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      counts.create += 1;
    }
  }

  return counts;
};
