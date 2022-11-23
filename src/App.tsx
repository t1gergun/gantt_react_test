import React, { useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";
import { ChartData, Chart } from "./types";
import { GanttChart, Header } from "./components";

import "./index.css";

const App = () => {
  const [data, setData] = useState<null | ChartData>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = async () => {
    const response = await axios.get("/tmp/test.php");
    const updateData = (data: ChartData) => {
      const updateSub = (sub: Chart[]): Chart[] => {
        return sub.map((el) =>
          el.sub
            ? { ...el, isVisible: false, sub: updateSub(el.sub) }
            : { ...el, isVisible: false }
        );
      };
      return {
        ...data,
        chart: {
          ...data.chart,
          isVisible: true,
          sub: updateSub(data.chart.sub!),
        },
      };
    };
    const updatedData = updateData(response.data);
    setData(updatedData);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleTask = useCallback(
    (id: number, isOpen: boolean) => {
      setData((prevState) => {
        const toggleNestedTasks = (sub: Chart[]): Chart[] => {
          if (isOpen) {
            return sub.map((el) =>
              el.sub
                ? { ...el, isVisible: !isOpen, sub: toggleNestedTasks(el.sub) }
                : { ...el, isVisible: !isOpen }
            );
          }
          return sub.map((el) => ({ ...el, isVisible: true }));
        };
        const updateSub = (sub: Chart[]): Chart[] => {
          return sub.map((el) => {
            if (el.id === id) {
              return { ...el, sub: toggleNestedTasks(el.sub!) };
            }
            return { ...el, sub: updateSub(el.sub!) };
          });
        };
        if (id === prevState?.chart.id) {
          return {
            ...prevState,
            chart: {
              ...prevState.chart,
              sub: toggleNestedTasks(prevState.chart.sub!),
            },
          };
        }
        return {
          ...prevState,
          period: prevState!.period,
          project: prevState!.project,
          chart: { ...prevState!.chart, sub: updateSub(prevState!.chart.sub!) },
        };
      });
    },
    [data]
  );

  const memorizedTasks = useMemo(() => {
    let nestedLevel = 0;
    if (data?.chart) {
      const taskList: { id: number; title: string; isVisible: boolean }[] = [];
      const tasksDuration: {
        id: number;
        start: string;
        end: string;
        task: number;
        nestedLevel: number;
        isVisible: boolean;
      }[] = [];
      const getTasks = ({
        id,
        title,
        sub,
        period_end,
        period_start,
        isVisible,
      }: Chart) => {
        taskList.push({ id, title, isVisible });
        if (period_start && period_end) {
          tasksDuration.push({
            id: tasksDuration.length,
            task: id,
            end: period_end,
            start: period_start,
            nestedLevel,
            isVisible,
          });
        }
        const getSub = (sub: Chart[]) => {
          nestedLevel++;
          sub.forEach(
            ({ id, title, sub, period_end, period_start, isVisible }) => {
              taskList.push({ id, title, isVisible });
              if (period_start && period_end) {
                tasksDuration.push({
                  id: tasksDuration.length,
                  task: id,
                  end: period_end,
                  start: period_start,
                  nestedLevel,
                  isVisible,
                });
              }
              if (sub) {
                getSub(sub);
              }
            }
          );
        };
        getSub(sub!);
      };
      getTasks(data!.chart);
      return { taskList, tasksDuration };
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container">
      <Header project={data!.project} period={data!.period} />
      <GanttChart
        chart={data!.chart}
        tasks={memorizedTasks!.taskList}
        tasksDuration={memorizedTasks!.tasksDuration}
        period={data!.period}
        toggleTask={toggleTask}
      />
    </div>
  );
};

export default App;
