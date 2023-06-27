import "./DistanceIcon.scss";

import React from "react";

import locationIcon from "../../assets/end-location.png";

interface DistanceIconProps {
  destinationsNum: number;
  dots?: number;
  className?: string;
}

const DistanceIcon = ({
  destinationsNum,
  dots = 6,
  className,
}: DistanceIconProps) => {
  return (
    <div className={`distance-icon ${className}`}>
      <div className="distance-icon__container">
        {
          <>
            {[...Array(destinationsNum)].map((element, i) => (
              <React.Fragment key={i}>
                <span className="distance-icon__container__start-icon"></span>
                {[...Array(dots)].map((_, index) => (
                  <span
                    key={index}
                    className="distance-icon__container__dot"
                  ></span>
                ))}
              </React.Fragment>
            ))}
          </>
        }

        <img src={locationIcon} alt="endLocation" />
      </div>
    </div>
  );
};

export default DistanceIcon;
