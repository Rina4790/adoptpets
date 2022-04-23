import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { fetchPet } from "../../redux/actions/petActions";
import { petsFetch } from "../../services/helpers";
import { Button } from "../Button/Button";
import { TextArea } from "../TextArea/TextArea";
import styles from "./AddPost.module.css";

export const UploadFile = () => {
  const [files, setFiles] = useState([""]);
  const [text, setText] = useState<string>("");
  const [preview, setPreview] = useState<string[]>([]);
  const [errors, setErrors] = useState<string>();
  const fileobj: any[] = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLoad = (event: any) => {
    setFiles(event.target.files);
    event.preventDefault();
    const images = event.target.files;
    fileobj.push(images);
    let reader;

    for (var i = 0; i < fileobj[0].length; i++) {
      reader = new FileReader();
      reader.readAsDataURL(fileobj[0][i]);
      reader.onload = (event: any) => {
        preview.push(event.target.result);
        setPreview([...preview]);
      };
    }
  };

  const removeImage = () => {
    setPreview([]);
    setFiles([""]);
  };

  const createNewPost = () => {
    if (files[0].length !== 0 && text) {
      const formData = new FormData();
      formData.append("text", text);
      for (let i = 0; i < files.length; i++) {
        formData.append(`image_files`, files[i]);
      }
      const petId = sessionStorage.getItem("petId");
      setErrors(undefined);
      petsFetch(`https://api2.adoptpets.click/pets/${petId}/posts`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
        },
        body: formData,
		}).then(() => {
			if (petId) {
				dispatch(fetchPet(petId));
			}
		})
		 .then(() => {
			navigate(`/pet/${petId}`);
		 });
		 
		 
      
    } else {
      setErrors("Add text and image");
    }
  };
  const { theme } = useContext(ThemeContext);
  return (
    <div className={styles.container}>
      <div
        className={styles.addPost}
        style={{
          color: theme.text,
        }}
      >
        Add new post
      </div>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.textArea}>
            <TextArea
              value={text}
              label="Text"
              onChange={(event) => setText(event.target.value)}
            />
          </div>
          <div className={styles.addBtn}>
            {preview.length !== 0 ? null : (
              <>
                <div className={styles.addImg}>
                  <Button onClick={() => {}}> Add</Button>
                  <input
                    type="file"
                    multiple
                    onChange={onLoad}
                    className={styles.inputAddImg}
                  />
                </div>
              </>
            )}
          </div>
          {preview.length !== 0 ? (
            <Button onClick={removeImage}>Remove image</Button>
          ) : null}
        </div>
        <div className={styles.right}>
          <div className={styles.preview}>
            {preview.length !== 0 ? (
              (preview || []).map((url, index) => (
                <img
                  src={url}
                  alt="..."
                  key={index}
                  style={{
                    height: "200px",
                    width: "200px",
                    objectFit: "cover",
                  }}
                />
              ))
            ) : (
              <div>Nothing added yet</div>
            )}
          </div>
        </div>
      </div>
      <Button onClick={createNewPost}>Add new post</Button>
      {errors && !(files[0].length !== 0 && text) ? (
        <div className={styles.errors}>{errors}</div>
      ) : null}
    </div>
  );
};
