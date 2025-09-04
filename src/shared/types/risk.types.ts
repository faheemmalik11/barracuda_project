export type RiskCheckStatus = 'success' | 'warning' | 'error';

export interface RiskCheck {
  status: RiskCheckStatus;
  title: string;
  description: string;
  score: number;
}

export interface RiskScoreProps {
  riskChecks?: RiskCheck[];
  isDetailView?: boolean;
  maxScore?: number;
  calculateScore?: (riskChecks: RiskCheck[]) => number;
}