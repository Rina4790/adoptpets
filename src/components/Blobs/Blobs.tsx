import { ReactNode } from "react";
import styles from "./Blobs.module.css";

interface IProps {
 
  children: ReactNode;
}

export const Container = ({ children }: IProps) => {
  return (
    <div className={styles.blob1}>
    	{children}</div>
			
  );
};


{/* <div className={styles.blob1}>
    	<div className={styles.blob2}>
			  <div className={styles.blob3}>
				  <div className={styles.blob4}>{children}</div>
			  </div>
	    </div>
    </div> */}