import { useContext } from "react";

import styles from "./PostCard.module.css";
import { Image } from "../Image/Image";
import { ThemeContext } from "../../context/ThemeContext";

import defaultImage from "./defaultPostCardImage.png";
import { Slider } from "../ImageSlider/ImageSlider";

export interface IPostCard {
	id: number;
	
	owner_id: number;
  images: string[] | string;
  text: string;
  time: Date;
  
  onClick?: () => void;
}

export const PostCard = ({
	id,
	owner_id,
  images,
  
  text,
  time,
//   onClick,
}: IPostCard) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={styles.postCard}
      // style={{
      //   background: theme.
      // }}
      // onClick={onClick}
    >
      <div className={styles.cardImage}>
        
			  <Slider photo={<img src={images[0]} />}
				  photo2={(images[1]) ? (<img src={images[1]} />) : null}
				  photo3={(images[2]) ? (<img src={images[2]} />) : null}
			  />  
			 

			  
			   
				   
        
      </div>

      <div className={styles.cardContent}>
        
        <p
          className={styles.contentText}
          style={{
            color: theme.grayText,
          }}
        >
          {text}
        </p>
        <p
          className={styles.contentDate}
          style={{
            color: theme.timeText,
          }}
        >
          {time.toString().split("T").join("  ").split('.')[0]}
        </p>
      </div>
    </div>
  );
};
