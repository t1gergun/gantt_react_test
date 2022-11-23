import { Chart } from "../../types";

export interface GanttChartProps {
  chart: Chart;
  tasks: { id: number; title: string; isVisible: boolean }[];
  tasksDuration: {
    id: number;
    task: number;
    start: string;
    end: string;
    nestedLevel: number;
  }[];
  period: string;
  toggleTask: (id: number, isOpen: boolean) => void;
}
