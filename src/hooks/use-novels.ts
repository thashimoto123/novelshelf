import { useContext, useEffect, useRef, useState } from 'react';

import { Novel } from 'services/novelshelf/models/novel';
import { collectionName } from 'services/novelshelf/constants';
import { FirebaseContext } from 'contexts';

type NovelsOptions = {
  limit?: number;
  site?: string;
  genre?: string;
};
const defaultOptions: Required<NovelsOptions> = {
  limit: 30,
  site: '',
  genre: '',
};

const useNovels = (options?: NovelsOptions) => {
  const [novels, setNovels] = useState<Novel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const firebaseRef = useRef(useContext(FirebaseContext));
  const optionsRef = useRef({ ...defaultOptions, ...options });

  useEffect(() => {
    const { db } = firebaseRef.current;
    if (!db) throw new Error('Firestore is not initialized');

    const collection = db.collection(collectionName.novels);

    let query = collection
      .orderBy('updatedAt', 'desc')
      .orderBy('title', 'asc')
      .limit(optionsRef.current.limit);
    if (optionsRef.current.site)
      query = query.where('site', '==', optionsRef.current.site);
    if (optionsRef.current.genre)
      query = query.where('genre', 'array-contains-ayn', [optionsRef.current.genre]);

    const load = async () => {
      setLoading(true);
      try {
        const snap = await query.get();
        const novelsData = snap.docs.map((doc) => ({
          ...(doc.data() as Novel),
          id: doc.id,
        }));
        setNovels(novelsData);
        setError(null);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    load();
  }, []);

  return { novels, loading, error };
};

export default useNovels;
