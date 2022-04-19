import styles from "./Modal.module.css";

export interface IComment {
  text: string;
  id: string;
  time: Date;
  owner_id: number;
  post_id: string;
	username: string;
	onClick?: () => void;
	children?: any
}

export const Comments = ({
  owner_id,
  text,
  id,
  time,
  post_id,
	username,
	onClick,
	children
}: IComment) => {
  return (
    <div className={styles.comment}>
      <div>
        <div className={styles.userInfoComment}>
          <div className={styles.petName}>{username}</div>
				  <div className={styles.text}>{text}</div>
				  
				  <div className={styles.delete}>{children}</div>
        </div>
        <div className={styles.time}>
          {time.toString().split("T").join("  ").split(".")[0]}
        </div>
      </div>
    </div>
  );
};
