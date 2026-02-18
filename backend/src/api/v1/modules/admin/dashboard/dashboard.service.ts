import { getStatsRepo } from './dashboard.repository';

export async function getStatsService() {
  return getStatsRepo();
}
