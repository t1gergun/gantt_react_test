import { Chart } from "../../types";

export interface CalendarProps {
  tasks: { id: number; title: string; isVisible: boolean }[];
  tasksDuration: {
    id: number;
    task: number;
    start: string;
    end: string;
    nestedLevel: number;
  }[];
  period: {
    monthStart: number;
    yearStart: number;
    monthEnd: number;
    yearEnd: number;
  };
}

export interface TimeRange {
  monthStart: number;
  yearStart: number;
  monthEnd: number;
  yearEnd: number;
}
