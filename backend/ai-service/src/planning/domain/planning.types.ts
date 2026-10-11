
export type PlanningStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'COMPLETED'
  | 'FAILED';

export interface PlanningJob {
  id: string;
  tripId: string;
  userId: string;
  status: PlanningStatus;
  attemptCount: number;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}
