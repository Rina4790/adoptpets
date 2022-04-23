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
  const email = useSelector((state: IState) => state.authReducer.email);
  const [newEmail, setNewEmail] = useState("");
  const country = useSelector((state: IState) => state.authReducer.country);
  const [newCountry, setNewCountry] = useState("");
  const city = useSelector((state: IState) => state.authReducer.city);
  const [newCity, setNewCity] = useState("");
  const address = useSelector((state: IState) => state.authReducer.address);
  const [newAddress, setNewAddress] = useState("");
  const phone = useSelector((state: IState) => state.authReducer.phone);
	const [newPhone, setNewPhone] = useState("");
	const statess = useSelector((state: IState) => state.authReducer.states);

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
      body: JSON.stringify({ state: states }),
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
        <p>My email: {email}</p>
        <Input
          type="text"
          label="newEmail"
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
        />
        <Button onClick={changeEmail}>change Email</Button>
      </div>
      <div>
        <p>My country: {country}</p>
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
        <p> States: {statess}</p>
        <input
          className={styles.input}
          type="text"
          name="states"
          list="states"
          onChange={(event) => setStates(event.target.value)}
        ></input>
        <datalist id="states">
          <option selected value="">
			 states
          </option>
			 {State.getStatesOfCountry(country).map((state) => (
                  <option label={state.name} value={state.isoCode}></option>
                ))}
        </datalist>
        <Button onClick={changeStates}>change states</Button>
		  </div>

		  <div>
        <p>My city: {city}</p>
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
			 {City.getCitiesOfState(country, states).map((city) => (
                  <option label={city.name} value={city.name}></option>
                ))}
        </datalist>
        <Button onClick={changeCity}>change city</Button>
		  </div>

      
      <div>
        <p>My address: {address}</p>
        <Input
          type="text"
          label="newAddress"
          value={newAddress}
          onChange={(event) => setNewAddress(event.target.value)}
        />
        <Button onClick={changeAddress}>change city</Button>
      </div>
      <div>
        <p>My phone: {phone}</p>
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
