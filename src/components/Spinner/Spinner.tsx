import "./Spinner.scss";

import React from "react";
import { PacmanLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="packman-loader">
      <PacmanLoader color={"var(--primary-color)"} />
    </div>
  );
};

export default Spinner;
