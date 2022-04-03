import { useContext } from "react";
import styles from "./PostCard.module.css";
import { ThemeContext } from "../../context/ThemeContext";
import SimpleImageSlider from "react-simple-image-slider";

export interface IPostCard {
  id: string;
  comments?: [];
  owner_id: number;
  images: string[];
  text: string;
  time: Date;
  onClick?: () => void;
}

export const PostCard = ({
  id,
  owner_id,
  images,
  onClick,
  text,
  time,
}: IPostCard) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={styles.postCard} onClick={onClick}>
      <div className={styles.cardImage}>
        <SimpleImageSlider
          width={300}
          height={300}
          images={images}
          showBullets={images.length !== 1 ? true : false}
          showNavs={images.length !== 1 ? true : false}
          navMargin={5}
          navSize={40}
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
          {time.toString().split("T").join("  ").split(".")[0]}
        </p>
      </div>
    </div>
  );
};
