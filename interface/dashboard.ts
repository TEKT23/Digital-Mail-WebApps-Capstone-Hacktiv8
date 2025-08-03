export interface Stat {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'warning' | 'stable';
  percentage?: string;
  icon: JSX.Element;
  color: string;
}

export interface RecentDocument {
  id: string;
  title?: string;
  sender?: string;
  date?: string;
  status: string;
  priority?: string;
  type?: 'masuk' | 'keluar';
  action?: string;
  user?: string;
  timestamp?: string;
}

export interface Workflow {
  id: number;
  title: string;
  department: string;
  status: string;
  documents: number;
  avgTime: string;
}

export interface PendingApproval {
  id: number;
  title: string;
  department: string;
  amount: string;
  priority: string;
  submitDate: string;
  deadline: string;
}

export interface DepartmentPerformance {
  name: string;
  completed: number;
  pending: number;
  efficiency: number;
}
