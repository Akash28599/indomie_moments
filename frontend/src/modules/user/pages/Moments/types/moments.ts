export type FilterType = 'all' | 'thisWeek';

export interface Moment {
  id: string;
  likes: number;
  status: 'approved' | 'pending' | 'rejected';
}


