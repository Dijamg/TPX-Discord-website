import cron from 'node-cron';

import { syncRiotPuuid } from "./syncRiotPuuid";
import { syncBasicLolInfo } from "./syncBasicLolInfo";
import { syncCurrentSeasonLolInfo } from "./syncCurrentSeasonLolInfo";
import { syncMasteryInfo } from "./syncMasteryInfo";
import { syncUpcomingClashes } from "./syncUpcomingClashes";
import { syncMatchHistory } from "./syncMatchHistory";

const jobLocks: Record<string, boolean> = {};

let isInitialSyncComplete = false;

const runSyncs = async () => {
  try {
    console.log('Starting initial syncs...');
    await syncRiotPuuid();
    await syncBasicLolInfo();
    await syncCurrentSeasonLolInfo();
    await syncMasteryInfo();
    await syncUpcomingClashes();
    await syncMatchHistory();
    isInitialSyncComplete = true;
    console.log('Initial syncs completed');
  } catch (error) {
    console.error('Error during syncs:', error);
  }
};


const gated = (fn: () => Promise<void>, name: string) => {
  return async () => {
    if (!isInitialSyncComplete) {
      console.log(`🛑 [BLOCKED] ${name}: Waiting for initial sync.`);
      return;
    }

    if (jobLocks[name]) {
      console.log(`🔒 [SKIPPED] ${name} is already running.`);
      return;
    }

    jobLocks[name] = true;
    console.log(`▶️ [STARTING] ${name}`);

    try {
      await fn();
      console.log(`✅ [COMPLETED] ${name}`);
    } catch (err) {
      console.error(`❌ [ERROR] ${name}:`, err);
    } finally {
      jobLocks[name] = false;
    }
  };
};


export const initScheduler = async () => { 
  // Run all once on lauch.
  await runSyncs();

  // Scheduling scripts

  // Every 12 hours
  cron.schedule('0 */12 * * *', gated(syncRiotPuuid, 'syncRiotPuuid'));
  cron.schedule('0 */12 * * *', gated(syncMasteryInfo, 'syncMasteryInfo'));

  // Every 1 hour
  cron.schedule('0 * * * *', gated(syncBasicLolInfo, 'syncBasicLolInfo'));

  // Every 30 minutes
  cron.schedule('*/30 * * * *', gated(syncCurrentSeasonLolInfo, 'syncCurrentSeasonLolInfo'));
  cron.schedule('*/30 * * * *', gated(syncMatchHistory, 'syncMatchHistory'));

  // Every 24 hours
  cron.schedule('0 0 * * *', gated(syncUpcomingClashes, 'syncUpcomingClashes'));

  console.log('✅ Cron jobs scheduled');
}



