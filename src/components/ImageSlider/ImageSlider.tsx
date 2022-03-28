import { useState } from "react";
import styles from "./Slider.module.css";

interface ISlider {
	photo: any;
	photo2?: any;
	photo3?: any;
	onClick?: () => void;
 }

export const Slider = ({ photo, photo2, photo3 }: ISlider) => {
  const [index, setIndex] = useState(0);
  console.log(index);
  return (
	  <div className={styles.wrapper}>
		  {index === 0 ? null : (
        <button onClick={() => setIndex((prev) => prev - 1)}>{"<"}</button>
      )}
      <div className={styles["container"]}>
        <div
          className={styles["inner-container"]}
          style={{
            width: 550 * 3,
            transform: `translateX(${-index * (550)}px)`,
          }}
        >
          <div className={styles.card}>{photo}</div>
          <div className={styles.card}>{photo2}</div>
          <div className={styles.card}>{photo3}</div>
       
        </div>
      </div>
      
      {index === 2 ? null : (
        <button onClick={() => setIndex((prev) => prev + 1)}>{">"}</button>
      )}
    </div>
  );
};
