import admin from 'firebase-admin';

import fetchNarouNovels from './fetch-narou-novels';
import fetchNovelupNovels from './fetch-novelup-novels';
import fetchNovelbaNovels from './fetch-novelba-novels';

admin.initializeApp();

export { fetchNarouNovels, fetchNovelupNovels, fetchNovelbaNovels };
