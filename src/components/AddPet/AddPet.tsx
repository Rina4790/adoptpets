import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { fetchPets } from "../../redux/actions/petActions";
import { petsFetch } from "../../services/helpers";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { TextArea } from "../TextArea/TextArea";
import styles from "./AddPet.module.css";

export const AddPet = () => {
  const { theme } = useContext(ThemeContext);

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [has_home, setHas_home] = useState<boolean>(false);
  const [image, setImage] = useState("");
  const [birth_date, setBirth_date] = useState<string>("");
  const [imageFile, setImageFile] = useState<Blob | null>(null);

  const onLoad = (event: any) => {
    setImageFile(event.target.files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (event: any) => {
      setImage(event.target.result);
    };
  };

  const removeImage = () => {
    setImage("");
    setImageFile(null);
  };

  const history = useHistory();
  const dispatch = useDispatch();

  const createNewPet = () => {
    const formData = new FormData();

    if (imageFile) {
      formData.append("image", imageFile);
    }
    formData.append("name", name);
    formData.append("description", description);
    formData.append("species", species);
    formData.append("sex", sex);
    formData.append("birth_date", birth_date);
    formData.append("has_home", JSON.stringify(has_home));

    petsFetch("https://api.adoptpets.click/pets", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
      },
      body: formData,
    });

    dispatch(fetchPets());
    history.push("/userProfile");
  };

  const { isDark } = useContext(ThemeContext);

  return (
    <>
      <div className={styles.addPostIndex}>
        <div className={styles.addPostWrraper}>
          <div className={styles.addPost}>
            <div className={styles.addText}>
              <Input
                type="text"
                label="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />

              <div className={styles.species}>
                <label>
                  <input
                    type="radio"
                    name="species"
                    value="cat"
                    checked={species == "cat"}
                    onChange={() => setSpecies("cat")}
                  />{" "}
                  Cat
                </label>
                <br></br>
                <label>
                  <input
                    type="radio"
                    name="species"
                    value="dog"
                    checked={species == "dog"}
                    onChange={() => setSpecies("dog")}
                  />{" "}
                  Dog
                </label>
              </div>

              <div className={styles.sex}>
                <label>
                  <input
                    type="radio"
                    name="sex"
                    value="M"
                    checked={sex == "M"}
                    onChange={() => setSex("M")}
                  />{" "}
                  Boy
                </label>
                <br></br>
                <label>
                  <input
                    type="radio"
                    name="sex"
                    value="F"
                    checked={sex == "F"}
                    onChange={() => setSex("F")}
                  />{" "}
                  Girl
                </label>
              </div>

              <div className={styles.birth_date}>
                <label className={styles.label}>
                  Date of birth (approximately)
                  <input
                    type="date"
                    name="birth_date"
                    value={birth_date}
                    onChange={(event) => setBirth_date(event.target.value)}
                    style={{
                      color: theme.colorOfTextInput,
                      border: theme.borderOfButton,
                    }}
                    className={`${styles.input}  ${
                      isDark ? styles.input_dark : styles.input
                    }`}
                  />
                </label>
              </div>

              <div className={styles.has_home}>
                <label>
                  <input
                    type="checkbox"
                    checked={has_home}
                    onChange={() => setHas_home(!has_home)}
                    className={styles.home}
                  />{" "}
                  Has_home?{" "}
                </label>
                <div>
                  {has_home ? (
                    <>
                      {" "}
                      {"  "} <img src="/images/homeFill.svg"></img> Yes
                    </>
                  ) : (
                    <>
                      <img src="/images/home.svg"></img> No, this pet is looking
                      for a home.
                    </>
                  )}
                </div>
              </div>

              <TextArea
                value={description}
                label="Description"
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className={styles.addImg}>
              {image ? (
                <>
                  <img src={image} />
                  <Button onClick={removeImage}>Remove image</Button>
                </>
              ) : (
                <p style={{ color: theme.text }} className={styles.addName}>
                  Image
                </p>
              )}

              <div className={styles.addBtn}>
                {image ? null : (
                  <>
                    <div className={styles.addImg}>
                      <Button onClick={() => {}}> Add</Button>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={onLoad}
                        className={styles.inputAddImg}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styles.addManeBtn}>
            <Button onClick={createNewPet}>Add Pet</Button>
          </div>
        </div>
      </div>
    </>
  );
};
