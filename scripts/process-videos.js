/**
 * 指定した動画IDを順番に処理するスクリプト
 * Usage: node scripts/process-videos.js
 */

require('dotenv').config({ path: '.env.local' });

const VIDEO_IDS = [
  '2363b629-61c8-4ce6-a767-987a9b2ceefb', // 令和８年１月臨時会１号（１）開会～諸般の報告
  'd7659757-61f6-4e71-a957-dbc4efdbeb95', // 令和８年１月臨時会１号（２）第１号議案
  'e013dd9e-61ae-4ed0-a57c-cd48a57b32da', // 令和８年１月臨時会１号（３）第２号議案
];

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

async function processVideo(videoId) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`Processing: ${videoId}`);
  console.log(`Time: ${new Date().toISOString()}`);
  console.log('='.repeat(60));

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5 * 60 * 1000); // 5分タイムアウト

    const res = await fetch(`${BASE_URL}/api/process/${videoId}`, {
      method: 'POST',
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data = await res.json();

    if (res.ok) {
      console.log('✅ Success:', data.message);
      console.log('   Article ID:', data.articleId);
      console.log('   Summary:', data.summary ? 'Yes' : 'No');
      console.log('   Infographic:', data.infographic ? 'Yes' : 'No');
      return true;
    } else {
      console.log('❌ Error:', data.error);
      return false;
    }
  } catch (err) {
    if (err.name === 'AbortError') {
      console.log('⏰ Timeout: Processing took too long');
    } else {
      console.log('❌ Exception:', err.message);
    }
    return false;
  }
}

async function main() {
  console.log('🚀 Starting video processing...');
  console.log(`Base URL: ${BASE_URL}`);
  console.log(`Videos to process: ${VIDEO_IDS.length}`);

  let successCount = 0;
  let failCount = 0;

  for (const videoId of VIDEO_IDS) {
    const success = await processVideo(videoId);
    if (success) {
      successCount++;
    } else {
      failCount++;
    }

    // 次の処理まで少し待つ
    if (VIDEO_IDS.indexOf(videoId) < VIDEO_IDS.length - 1) {
      console.log('\nWaiting 5 seconds before next video...');
      await new Promise(r => setTimeout(r, 5000));
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log('📊 Processing complete!');
  console.log(`   Success: ${successCount}`);
  console.log(`   Failed: ${failCount}`);
  console.log('='.repeat(60));
}

main().catch(console.error);
