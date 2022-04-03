import { ChangeEventHandler } from "react";
import styles from "./Modal.module.css";
import SimpleImageSlider from "react-simple-image-slider";

export interface IModal {
  id: string;
  comments?: [];
  owner_id?: number;
  images: string[];
  text?: string;
  time: Date;
  avatar?: string;
  name?: string;
  onClick?: () => void;
  isVisible: boolean;
  onClose: () => void;
  children?: any;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

export const Modal = ({
  isVisible,
  onClose,
  images,
  text,
  id,
  avatar,
  name,
  time,
  onClick,
  value,
  onChange,
  children,
}: IModal) => {
  return isVisible ? (
    <div className={styles.wrapper}>
      <div className={styles.background} onClick={onClose}></div>
      <div className={styles.inner}>
        <div className={styles.container}>
          <SimpleImageSlider
            width={770}
            height={770}
            images={images}
            showBullets={images.length !== 1 ? true : false}
            showNavs={images.length !== 1 ? true : false}
            navMargin={15}
          />
          <div className={styles.info}>
            <div className={styles.userInfo}>
              <img src={avatar} className={styles.avatar}></img>
              <div className={styles.petName}>{name}</div>
            </div>
            <div className={styles.comments}>
              <div className={styles.comment}>
                <div className={styles.userInfoComment}>
                  <div className={styles.petName}>{name}</div>
                  <div className={styles.text}>{text}</div>
                </div>
                <div className={styles.time}>
                  {time.toString().split("T").join("  ").split(".")[0]}
                </div>
              </div>
              {children}
            </div>
            <div className={styles.footerContainer}>
              <div className={styles.footer}>
                <div className={styles.textarea}>
                  <textarea
                    placeholder="Add comment..."
                    value={value}
                    onChange={onChange}
                  />
                </div>
                <div className={styles.btn}>
                  <button onClick={onClick}>Publish</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.close}>
          <div onClick={onClose} className={styles.closeBtn}>
            <img src="/images/close.svg"></img>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
