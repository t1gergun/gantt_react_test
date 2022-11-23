import { FC, useState } from "react";
import { TaskProps } from "./types";
import { nestingIcons } from "../../constants/nestingIcons";
import arrowDownIcon from "../../public/icons/arrowDownIcon.svg";

import "./styles.css";

export const Task: FC<TaskProps> = ({
  title,
  sub,
  nestedLevel = 0,
  id,
  toggleTask,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleNesting = () => {
    toggleTask(id, isOpen);
    setIsOpen(!isOpen);
  };

  const getBorderStyle = (nestedLevel: number) => ({
    borderTop: !nestedLevel ? "1px solid rgba(38, 40, 66, 0.12)" : "",
    borderRight: !nestedLevel ? "1px solid rgba(38, 40, 66, 0.12)" : "",
    borderLeft: !nestedLevel ? "1px solid rgba(38, 40, 66, 0.12)" : "",
  });

  console.log(nestedLevel);

  return (
    <div style={getBorderStyle(nestedLevel)}>
      <div
        className="task_wrapper"
        style={{ paddingLeft: `${nestedLevel * 22 + 22}px` }}
        onClick={toggleNesting}
      >
        {sub ? (
          <img
            src={arrowDownIcon}
            alt="arrowDownIcon"
            className={`task_arrow_icon ${isOpen && "rotated"}`}
          />
        ) : (
          <div className="spacer" />
        )}

        <img src={nestingIcons[nestedLevel]} alt="nestedLevelIcon" />
        <span className="task_sub_counter">{sub?.length || 0}</span>
        <span>{title}</span>
      </div>

      <div>
        {isOpen &&
          sub?.map(({ title, sub, id }) => (
            <Task
              key={id}
              title={title}
              sub={sub}
              nestedLevel={nestedLevel + 1}
              id={id}
              toggleTask={toggleTask}
            />
          ))}
      </div>
    </div>
  );
};
