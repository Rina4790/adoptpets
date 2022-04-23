import { useState } from "react";
import styles from "./Tooltip.module.css"

interface IProps {
	children: any;
	text: string;
 }

export const Tooltip = ( { children, text }: IProps ) => {
	const [show, setShow] = useState(false);
 
	return (
	  <div className={styles.tooltipContainer}>
		 <div className={show ? `${styles.tooltipBox} ${styles. visible}` : `${styles.tooltipBox}`}>
			{text}
			<span className={styles.tooltipArrow} />
		 </div>
		 <div
			onMouseEnter={() => setShow(true)}
			onMouseLeave={() => setShow(false)}
			
		 >
			{children}
		 </div>
	  </div>
	);
 };