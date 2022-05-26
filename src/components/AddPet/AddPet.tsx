import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { fetchPets } from "../../redux/actions/petActions";
import { petsFetch } from "../../services/helpers";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { TextArea } from "../TextArea/TextArea";
import styles from "./AddPet.module.css";
import Cropper from "react-cropper";
import { UseModal } from "../UseModal/UseModal";
import { Container } from "../Blobs/Blobs";
import "cropperjs/dist/cropper.css";

export const AddPet = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [species, setSpecies] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [hasHome, setHasHome] = useState<boolean>(false);
  const [image, setImage] = useState("");
  const [birthDate, setBirthDate] = useState<string>("");
  const [errors, setErrors] = useState<string>();
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onLoad = (event: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (event: any) => {
      setImage(event.target.result);
    };
    setIsModalVisible(true);
  };

  const removeImage = () => {
    setImage("");
    setIsModalVisible(false);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      cropper.getCroppedCanvas({
        width: 300,
        height: 300,
        minWidth: 256,
        minHeight: 256,
        maxWidth: 4096,
        maxHeight: 4096,
        fillColor: "#fff",
        imageSmoothingEnabled: false,
        imageSmoothingQuality: "medium",
      });
      setCropData(cropper.getCroppedCanvas().toDataURL("image/jpeg", 0.2));

      fetch(cropData)
        .then((res) => res.blob())
        .then((blob) => {
          var fd = new FormData();
          fd.append("image", blob, "filename");
        });
      setIsModalVisible(false);
    }
  };

  const dispatch = useDispatch();

  const createNewPet = () => {
    if (cropData && name && description && species && sex && birthDate) {
      fetch(cropData)
        .then((res) => res.blob())
        .then((blob) => {
          var formData = new FormData();
          formData.append("image", blob, "filename");
          formData.append("name", name);
          formData.append("description", description);
          formData.append("species", species);
          formData.append("sex", sex);
          formData.append("birth_date", birthDate);
          formData.append("has_home", JSON.stringify(hasHome));

          petsFetch("https://api2.adoptpets.click/pets", {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain, */*",
            },
            body: formData,
          })
            .then(() => {
              dispatch(fetchPets());
            })
            .then(() => {
              navigate("/userProfile");
            });
        });
    } else {
      setErrors("Fill in all fields and add a photo, please.");
    }
  };

  const { isDark } = useContext(ThemeContext);

  return (
    <Container>
      <div className={styles.addPostIndex}>
        <div
          className={styles.addPost}
          style={{
            backgroundColor: theme.postBackground,
            color: theme.grayText,
          }}
        >
          <div
            className={
              isDark
                ? `${styles.addPrewiu} ${styles.addPrewiuBlack}`
                : `${styles.addPrewiu}`
            }
          >
            <input
              type="file"
              accept="image/*"
              onChange={onLoad}
              className={styles.inputAddImg}
            />

            {cropData ? (
              <img src={cropData}></img>
            ) : (
              <img src="./images/add_big.svg"></img>
            )}
          </div>
          <div className={styles.addText}>
            <Input
              type="text"
              label="Name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

            <div className={styles.species}>
              <p style={{ color: theme.timeText }}>Kind: </p>
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
              <p style={{ color: theme.timeText }}>Gender: </p>
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
                <p style={{ color: theme.timeText }}> Date of birth: </p>
                <input
                  type="date"
                  name="birth_date"
                  value={birthDate}
                  onChange={(event) => setBirthDate(event.target.value)}
                  style={{
                    color: theme.colorOfTextInput,
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
                  checked={hasHome}
                  onChange={() => setHasHome(!hasHome)}
                  className={styles.home}
                />{" "}
                <p style={{ color: theme.timeText }}>Has home?</p>{" "}
              </label>
              <div>
                {hasHome ? (
                  <div className={styles.home}>
                    {" "}
                    {"  "}{" "}
                    <img
                      src={
                        isDark
                          ? "/images/homeFill.svg"
                          : "/images/homeFill_bl.svg"
                      }
                    ></img>{" "}
                    <>Yes</>
                  </div>
                ) : (
                  <div className={styles.home}>
                    <img
                      src={isDark ? "/images/home.svg" : "/images/home_bl.svg"}
                    ></img>
                    <>No, this pet is looking for a home.</>
                  </div>
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
            <UseModal
              isVisible={isModalVisible}
              onClose={() => setIsModalVisible(false)}
            >
              <div className={styles.cropper}>
                <Cropper
                  style={{ height: "40%", width: "40%" }}
                  zoomTo={0}
                  aspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={170}
                  minCropBoxWidth={170}
                  background={true}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={true}
                  onInitialized={(instance) => {
                    setCropper(instance);
                  }}
                  guides={true}
                />
              </div>
              <Button onClick={getCropData}>Crop</Button>
              <Button onClick={removeImage}>Cancel</Button>
            </UseModal>
          </div>
        </div>
        <div className={styles.addManeBtn}>
          <Button onClick={createNewPet}>Add Pet</Button>
        </div>
        {errors &&
        !(cropData && name && description && species && sex && birthDate) ? (
          <div
            className={styles.errors}
            style={{
              color: theme.grayText,
            }}
          >
            {errors}
          </div>
        ) : null}
      </div>
    </Container>
  );
};
