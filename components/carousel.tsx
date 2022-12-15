import React, { Fragment, useEffect } from "react";
import { Carouseldata } from "../data/carsouseldata";
import style from "./carousel.module.css";

export default function Carousel() {
  const [idx, setidx] = React.useState<number>(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setidx(idx === Carouseldata.length - 1 ? 0 : idx + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [idx]);
  function changeslide() {
    setidx(idx === Carouseldata.length - 1 ? 0 : idx + 1);
  }

  return (
    <div className={style.imgcontainer}>
      {Carouseldata.map((curval, i) => {
        return (
          <Fragment key={curval.id}>
            {i === idx && <img src={curval.img} alt="" onClick={changeslide} />}
          </Fragment>
        );
      })}
    </div>
  );
}
