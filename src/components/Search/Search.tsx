import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchPosts } from "../../redux/actions/postsActions";
import { Button } from "../Button/Button";
import styles from "./Search.module.css";
import { Country, State, City } from "country-state-city";
import { ThemeContext } from "../../context/ThemeContext";

interface IProps {
  closeSearchBar?: () => void;
  inputChecked?: boolean;
  onChange?: () => void;
  onClick?: () => void;
  openSearchBar?: () => void;
	isVisible: boolean;
	onChangeCountry: (event: any) => void;
	onChangeSpecies: (event: any) => void;
	onChangeGender: (event: any) => void;
	onChangeDate: (event: any) => void;
	onChangeHasHome: (event: any) => void;
	onChangeCity: (event: any) => void;
}

export const SearchBar = ({
  closeSearchBar,
  inputChecked,
  onChange,
  onClick,
  openSearchBar,
	isVisible,
	onChangeCountry,
	onChangeSpecies,
	onChangeGender,
	onChangeDate,
	onChangeHasHome,
	onChangeCity
}: IProps) => {
 
  const [species, setSpecies] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [gte_date, setGteDate] = useState("1900-04-03");
  const [hasHomeStr, setHasHomeStr] = useState<string>("");
  let has_home: boolean | null;
  {
    hasHomeStr === "true" ? (has_home = true) : (has_home = false);
  }
  const countries = Country.getAllCountries();

  const [country, setCountry] = useState("");
  const [states, setStates] = useState("");
  const [cities, setCities] = useState("");
  const { theme } = useContext(ThemeContext);
  const { isDark } = useContext(ThemeContext);
  return (
    <>
      <div className={styles.searchContaiter} onClick={openSearchBar}>
			  <img src={isDark ? "/images/filter2.svg" : "/images/filter.svg"} alt="filter" 
			  />
        <p style={{
        color: theme.blackWhiteText
      }}>Filter</p>
      </div>
      {isVisible ? (
        <div className={styles.container}>
				  <div className={styles.searchContainerVisible}
				  style={{
					  color: theme.blackWhiteText,
					  background: theme.searchBackground,
				 }}>
            <form onChange={onChangeSpecies}>
						  <div className={isDark ? `${styles.select_dark}` : `${styles.select}`}>
							  
              	<select 
	                onChange={(event) => setSpecies(event.target.value)}
								  value={species}
								  
	              >
	                <option selected value="">
	                  Select pet
	                </option>
	                <option value="cat">Cat</option>
	                <option value="dog">Dog</option>
	              </select>
              </div>
            </form>

            <form onChange={onChangeGender}> 
              <div className={isDark ? `${styles.select_dark}` : `${styles.select}`}>
              	<select
	                onChange={(event) => setSex(event.target.value)}
	                value={sex}
	              >
	                <option selected value="">
	                  Pet's gender
	                </option>
	                <option value="M">Boy</option>
	                <option value="F">Girl</option>
	              </select>
              </div>
            </form>

            <form onChange={onChangeDate}>
              <div className={isDark ? `${styles.select_dark}` : `${styles.select}`}>
              	<select 
	                onChange={(event) => setGteDate(event.target.value)}
	                value={gte_date}
	              >
	                <option selected value="1900-04-03">
	                  Pet's age
	                </option>
	                <option value="2022-04-03">Young</option>
	                <option value="1900-04-03">Adult</option>
	              </select>
              </div>
            </form>

            <form onChange={onChangeHasHome}>
              <div className={isDark ? `${styles.select_dark}` : `${styles.select}`}>
              	<select
	                onChange={(event) => setHasHomeStr(event.target.value)}
	                value={hasHomeStr}
	              >
	                <option selected value="">
	                  Pet has home?
	                </option>
	                <option value="true">Yes</option>
	                <option value="false">No</option>
	              </select>
              </div>
            </form>

            <form onChange={onChangeCountry}>
              <div className={isDark ? `${styles.select_dark}` : `${styles.select}`}>
              	<select
								  onChange={(event) => setCountry(event.target.value)}
								  
	                value={country}
	              >
	                <option selected value="">
	                  Country
	                </option>
	
	                {countries.map((country) => (
	                  <option label={country.name} value={country.isoCode}></option>
	                ))}
	              </select>
              </div>
            </form>

            <form >
              <div className={isDark ? `${styles.select_dark}` : `${styles.select}`}>
              	<select
	                onChange={(event) => setStates(event.target.value)}
	                value={states}
	              >
	                <option selected value="">
	                  States
	                </option>
	                {State.getStatesOfCountry(country).map((state) => (
	                  <option label={state.name} value={state.isoCode}></option>
	                ))}
	              </select>
              </div>
            </form>

            <form onChange={onChangeCity}>
              <div className={isDark ? `${styles.select_dark}` : `${styles.select}`}>
              	<select
	                onChange={(event) => setCities(event.target.value)}
	                value={cities}
	              >
	                <option selected value="">
	                  Cities
	                </option>
	                {City.getCitiesOfState(country, states).map((city) => (
	                  <option label={city.name} value={city.name}></option>
	                ))}
	              </select>
              </div>
            </form>
          </div>
          <div>
            <Button onClick={onClick}>Search</Button>
          </div>
        </div>
      ) : null}
    </>
  );
};
