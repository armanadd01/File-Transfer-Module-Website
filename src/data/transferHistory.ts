import { TransferHistory, ActivityType } from '../types';
import { sentTransfers } from './sentTransfers';
import { receivedTransfers } from './receivedTransfers';

// Generate 500 mock transfer history entries
const generateMockTransferHistory = (): TransferHistory[] => {
  const activityTypes: ActivityType[] = ['sent', 'received', 'downloaded', 'forwarded', 'deleted'];
  
  // Combine sent and received transfers and add history-specific properties
  const allTransfers = [...sentTransfers, ...receivedTransfers].slice(0, 500);
  
  return allTransfers.map((transfer, index) => {
    const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const lastActivityDate = new Date(new Date(transfer.createdAt).getTime() + Math.floor(Math.random() * 5) * 24 * 60 * 60 * 1000);
    
    return {
      ...transfer,
      id: `hist-${index + 3000}`,
      lastActivity: lastActivityDate.toISOString(),
      activityType
    };
  });
};

export const transferHistory = generateMockTransferHistory();
