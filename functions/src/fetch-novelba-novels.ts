import * as functions from 'firebase-functions';
import admin from 'firebase-admin';
import puppeteer from 'puppeteer';

import { saveNovels } from './firestore-admin/novel';
import { feedNewArrivals } from './crawlers/novelba-new-arrivals';
import { siteName } from './services/novelshelf/constants';

const PUPPETEER_OPTIONS = {
  args: [
    '--disable-gpu',
    '-–disable-dev-shm-usage',
    '--disable-setuid-sandbox',
    '--no-first-run',
    '--no-sandbox',
    '--no-zygote',
    '--single-process',
  ],
  headless: true,
};

export default functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 500,
    memory: '2GB',
  })
  .pubsub.schedule('20 0,4,8,12,16,20 * * *')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    const browser = await puppeteer.launch(PUPPETEER_OPTIONS);
    const page = await browser.newPage();
    const db = admin.firestore();

    const novels = await feedNewArrivals(page);
    const fetchCounts = await saveNovels(db, novels, siteName.novelba);

    await browser.close();

    console.log(
      `Fetched Novelba novels. Create ${fetchCounts.create} novels. Update ${fetchCounts.update} novels.`,
    );
  });
