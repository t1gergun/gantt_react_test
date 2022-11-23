import { Chart } from "../../types";

export interface TaskProps {
  nestedLevel?: number;
  title: string;
  sub?: Chart[];
  id: number;
  toggleTask: (id: number, isOpen: boolean) => void;
}
