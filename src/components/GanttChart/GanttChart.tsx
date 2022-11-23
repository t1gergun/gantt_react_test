import React, { FC } from "react";
import { Calendar, Tasks } from "../../components";
import { GanttChartProps } from "./types";

import "./styles.css";

export const GanttChart: FC<GanttChartProps> = ({
  chart,
  tasks,
  tasksDuration,
  period,
  toggleTask,
}) => {
  const [start, end] = period.split("-").map((el) => {
    const [day, month, year] = el.split(".");
    return `${year}-${month}-${day}`;
  });

  const visibleRows = tasks.filter((el) => el.isVisible);

  const calendarPeriod = {
    monthStart: new Date(start).getMonth(),
    yearStart: new Date(start).getFullYear(),
    monthEnd: new Date(end).getMonth(),
    yearEnd: new Date(end).getFullYear(),
  };
  return (
    <div className="grid_container">
      <Tasks chart={chart} toggleTask={toggleTask} />
      <Calendar
        tasks={tasks}
        tasksDuration={tasksDuration}
        period={calendarPeriod}
      />
      <div
        className="gantt_fadeout"
        style={{
          height: `calc(${visibleRows.length} * 40px + 48px)`,
        }}
      ></div>
    </div>
  );
};
