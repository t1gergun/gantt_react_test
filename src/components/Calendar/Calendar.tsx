import { FC, ReactNode } from "react";
import {
  monthDiff,
  getDaysInMonth,
  createFormattedDateFromStr,
  dayDiff,
} from "../../utils/dateFunctions";
import { months, nestedLevelColors } from "../../constants";
import { CalendarProps } from "./types";

import "./styles.css";

export const Calendar: FC<CalendarProps> = ({
  tasks,
  tasksDuration,
  period,
}) => {
  const startMonth = new Date(period.yearStart, period.monthStart);
  const endMonth = new Date(period.yearEnd, period.monthEnd);
  const numMonths = monthDiff(startMonth, endMonth) + 1;
  let month = new Date(startMonth);

  const visibleRows = tasks.filter((el) => el.isVisible);

  let dayRows = [];
  let dayRow = [];
  let taskRows: ReactNode[] = [];
  let taskRow: ReactNode[] = [];
  const daysOfPeriod = [];

  for (let i = 0; i < numMonths; i++) {
    const numDays = getDaysInMonth(month.getFullYear(), month.getMonth() + 1);

    for (let j = 1; j <= numDays; j++) {
      daysOfPeriod.push(`${j} ${months[month.getMonth()]}`);
      dayRow.push(
        <div key={j} className="gantt_time_period bordered">
          <span className="gantt_time_period_span">{j}</span>
        </div>
      );
    }

    dayRows.push(
      <div key={i} className="gantt_time_period">
        {dayRow}
      </div>
    );

    dayRow = [];
    month.setMonth(month.getMonth() + 1);
  }

  let monthChunks = [];
  for (let i = 0; i < daysOfPeriod.length; i += 7) {
    const chunk = daysOfPeriod.slice(i, i + 7);
    monthChunks.push(chunk);
  }

  monthChunks = monthChunks.map((chunk, i) => (
    <div
      key={i + Date.now()}
      className="gantt_time_period full_bordered"
      style={{ width: `calc(${chunk.length} * 22px)` }}
    >
      <span className="gantt_time_period_span">
        {chunk[0]} - {chunk[chunk.length - 1]}
      </span>
    </div>
  ));

  if (tasks) {
    tasks.forEach((task: { id: number; title: string; isVisible: boolean }) => {
      let month = new Date(startMonth);
      for (let i = 0; i < numMonths; i++) {
        const curYear = month.getFullYear();
        const curMonth = month.getMonth() + 1;

        const numDays = getDaysInMonth(curYear, curMonth);

        for (let j = 1; j <= numDays; j++) {
          const formattedDate = createFormattedDateFromStr(
            curYear,
            curMonth,
            j
          );
          taskRow.push(
            <div
              key={`${task.id}-${j}`}
              className="gant_time_period_cell"
              data-task={task?.id}
              data-date={formattedDate}
            >
              {tasksDuration.map((el, i) => {
                if (el?.task === task?.id && el?.start === formattedDate) {
                  return (
                    <div
                      key={`${i}-${el?.id}`}
                      className="task_duration_container"
                    >
                      <div
                        className="task_duration"
                        style={{
                          width: `calc(${dayDiff(el?.start, el?.end)} * 22px)`,
                          background:
                            nestedLevelColors[el.nestedLevel].background,
                          border: `1px solid ${
                            nestedLevelColors[el.nestedLevel].border
                          }`,
                        }}
                      ></div>
                      <span>{task.title}</span>
                    </div>
                  );
                }
              })}
            </div>
          );
        }
        if (task.isVisible) {
          taskRows.push(
            <div key={`${i}-${task?.id}`} className="gantt_time_period">
              {taskRow}
            </div>
          );
        }

        taskRow = [];
        month.setMonth(month.getMonth() + 1);
      }
    });
  }

  return (
    <div
      className="gant_grid_container_time"
      style={{
        gridTemplateColumns: `repeat(${numMonths}, 1fr)`,
        gridTemplateRows: `24px 24px auto`,
      }}
    >
      <div
        style={{
          gridColumn: "1/-1",
          display: "grid",
          gridTemplateColumns: `repeat(${monthChunks.length}, 154px)`,
        }}
      >
        {monthChunks}
      </div>
      {dayRows}
      <div
        id="gantt-time-period-cell-container"
        style={{
          gridColumn: "1/-1",
          display: "grid",
          gridTemplateColumns: `repeat(${numMonths}, 1fr)`,
          gridTemplateRows: `repeat(${visibleRows.length}, 40px)`,
        }}
      >
        {taskRows}
      </div>
    </div>
  );
};
