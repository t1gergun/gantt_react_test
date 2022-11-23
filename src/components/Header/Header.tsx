import { FC } from "react";
import { HeaderProps } from "./types";
import exportIcon from "../../public/icons/exportIcon.svg";

import "./styles.css";

export const Header: FC<HeaderProps> = ({ project, period }) => (
  <div className="header">
    <div>
      {project} / {period}
    </div>
    <button className="export_button">
      <img src={exportIcon} alt="exportIcon" />
      <span>Export</span>
    </button>
  </div>
);
