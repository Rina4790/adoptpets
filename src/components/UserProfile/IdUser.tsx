import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userId } from "../../redux/actions/userActions";

import { IState } from "../../redux/store";

export const IdUser = () => {
	const params: { usserId: string } = useParams();
   const user = useSelector((state: IState) => state.userReducer.user);
	const dispatch = useDispatch();
	
	useEffect(() => {
		dispatch(userId(params.usserId));
		
		
	}, []);
	
	return (
		<h3>
			{user.username}
		</h3>
	)
	

}