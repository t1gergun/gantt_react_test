export type Chart = {
  id: number;
  period_end: string;
  period_start: string;
  title: string;
  sub?: Chart[];
  isVisible: boolean;
};

export interface ChartData {
  project: string;
  period: string;
  chart: Chart;
}
