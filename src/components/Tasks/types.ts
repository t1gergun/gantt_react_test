import { Chart } from "../../types";

export interface TasksProps {
  chart: Chart;
  toggleTask: (id: number, isOpen: boolean) => void;
}
