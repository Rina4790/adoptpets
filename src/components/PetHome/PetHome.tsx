import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { fetchPet } from "../../redux/actions/petActions";
import { IState } from "../../redux/store";
import { Button } from "../Button/Button";

export const PetHome = () => {
	
	
	const pet = useSelector((state: IState) => state.petsReducer.pet);
	const dispatch = useDispatch();

	const petInHome = localStorage.getItem("petInHome");
	console.log(petInHome)

	useEffect(() => {
		if (petInHome) {
			dispatch(fetchPet(petInHome));
		}
	}, []);
	

	
	
	const deletePet = () => {
		localStorage.removeItem("petInHome");
		window.location.reload()
	}

	return pet.name ? (
		<>
		<h3>{pet.name}</h3>
			<img src={pet.image} style={{width: "300px", height: "300px", objectFit: "cover"}}></img>
			<Button onClick={deletePet}>delete pet</Button>
		</>
		
	) : (<>
	<h3>Not pets in home</h3>
		</>)
	
}