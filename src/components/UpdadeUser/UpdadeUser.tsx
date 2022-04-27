import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userData } from "../../redux/actions/authActions";
import { fetchPets } from "../../redux/actions/petActions";
import { IState } from "../../redux/store";
import { petsFetch } from "../../services/helpers";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import styles from "./UpdateUser.module.css";
import { Country, State, City } from "country-state-city";

export const Update = () => {
  const dispatch = useDispatch();
  const [newEmail, setNewEmail] = useState("");
	const [newCountry, setNewCountry] = useState("");
	const [newState, setNewState] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newAddress, setNewAddress] = useState("");
	const [newPhone, setNewPhone] = useState("");
	const user = useSelector((state: IState) => state.authReducer);


  useEffect(() => {
	  dispatch(userData());
	  
  }, []);

  const changeEmail = () => {
    petsFetch(`https://api2.adoptpets.click/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: newEmail }),
	 }).then(() => {
		setNewEmail("")
		dispatch(userData())
	 })
  };

  const changeCountry = () => {
    petsFetch(`https://api2.adoptpets.click/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ country: newCountry }),
	 }).then(() => {
		setNewCountry("")
		dispatch(userData())
	 }).then(() => {
		window.location.reload()
	 })
  };
	
	const changeStates = () => {
		petsFetch(`https://api2.adoptpets.click/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ state: newState }),
    });
    setTimeout(() => {
      dispatch(userData());
      window.location.reload();
    }, 1000);
	}

  const changeCity = () => {
    petsFetch(`https://api2.adoptpets.click/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ city: newCity }),
    });
    setTimeout(() => {
      dispatch(userData());
      window.location.reload();
    }, 1000);
  };

  const changeAddress = () => {
    petsFetch(`https://api2.adoptpets.click/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: newAddress }),
    });
    setTimeout(() => {
      dispatch(userData());
      window.location.reload();
    }, 1000);
  };

  const changePhone = () => {
    petsFetch(`https://api2.adoptpets.click/users/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone: newPhone }),
    });
    setTimeout(() => {
      dispatch(userData());
      window.location.reload();
    }, 1000);
  };
	const countries = Country.getAllCountries();
	const [states, setStates] = useState("");

  return (
    <div className={styles.wrapper}>
      <div>
        <p>My email: {user.email}</p>
        <Input
          type="text"
          label="newEmail"
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
        />
        <Button onClick={changeEmail}>change Email</Button>
      </div>
      <div>
        <p>My country: {user.country}</p>
        <input
          className={styles.input}
          type="text"
          name="country"
          list="country"
          onChange={(event) => setNewCountry(event.target.value)}
        ></input>
        <datalist id="country">
          <option selected value="">
            Country
          </option>
          {countries.map((country) => (
            <option label={country.name} value={country.isoCode}></option>
          ))}
        </datalist>
        <Button onClick={changeCountry}>change country</Button>
		  </div>
		  
		  <div>
        <p> States: {user.state}</p>
        <input
          className={styles.input}
          type="text"
          name="state"
          list="state"
          onChange={(event) => setNewState(event.target.value)}
        ></input>
        <datalist id="state">
          <option selected value="">
			 states
          </option>
			 {State.getStatesOfCountry(user.country).map((state) => (
                  <option label={state.name} value={state.isoCode}></option>
                ))}
        </datalist>
        <Button onClick={changeStates}>change states</Button>
		  </div>

		  <div>
        <p>My city: {user.city}</p>
        <input
          className={styles.input}
          type="text"
          name="newCity"
          list="newCity"
          onChange={(event) => setNewCity(event.target.value)}
        ></input>
        <datalist id="newCity">
          <option selected value="">
			 newCity
          </option>
			 {City.getCitiesOfState(user.country, user.state).map((city) => (
                  <option label={city.name} value={city.name}></option>
                ))}
        </datalist>
        <Button onClick={changeCity}>change city</Button>
		  </div>

      
      <div>
        <p>My address: {user.address}</p>
        <Input
          type="text"
          label="newAddress"
          value={newAddress}
          onChange={(event) => setNewAddress(event.target.value)}
        />
        <Button onClick={changeAddress}>change city</Button>
      </div>
      <div>
        <p>My phone: {user.phone}</p>
        <Input
          type="text"
          label="newPhone"
          value={newPhone}
          onChange={(event) => setNewPhone(event.target.value)}
        />
        <Button onClick={changePhone}>change phone</Button>
      </div>
    </div>
  );
};
