import { Task } from "../Task";
import React, { FC } from "react";
import { TasksProps } from "./types";

import "./styles.css";

export const Tasks: FC<TasksProps> = ({ chart, toggleTask }) => (
  <div>
    <div className="empty_task_row">
      <span>Work item</span>
    </div>
    <Task
      title={chart.title}
      sub={chart.sub}
      id={chart.id}
      toggleTask={toggleTask}
    />
  </div>
);
