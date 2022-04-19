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
	onLike?: () => void;
	onLikeDelete?: () => void;
  isVisible: boolean;
  onClose: () => void;
  children?: any;
  value: string;
	onChange: ChangeEventHandler<HTMLTextAreaElement>;
	likes_count?: number;
	comments_count?: number;
	liked?: boolean;
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
	likes_count,
	comments_count,
	onLike,
	liked,
	onLikeDelete
}: IModal) => {
  return isVisible ? (
    <div className={styles.wrapper}>
      <div className={styles.background} onClick={onClose}></div>
      <div className={styles.inner}>
        <div className={styles.container}>
				  <SimpleImageSlider
				style={{objectFit: "cover"}}
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
					  <div className={styles.likesAndComments}>
						  <div className={styles.likesCount}>
							  {liked ? (<img onClick={onLikeDelete} src="/images/liked.svg"></img>):
							  (<img onClick={onLike} src="/images/like1.svg"></img>)}
							   {likes_count}
						  </div>
						  <div className={styles.commentsCount}>
						  <img src="/images/comment.svg"></img> {comments_count}
						  </div>
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
