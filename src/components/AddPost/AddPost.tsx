import { useContext, useEffect, useRef, useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { fetchPet } from "../../redux/actions/petActions";
import { petsFetch } from "../../services/helpers";
import { Button } from "../Button/Button";
import { TextArea } from "../TextArea/TextArea";
import styles from "./AddPost.module.css";
import Cropper from "react-cropper";
import { render } from "react-dom";

export const UploadFile = () => {
  const [files, setFiles] = useState([""]);
  const [text, setText] = useState<string>("");
  const [preview, setPreview] = useState<any[]>([]);
  const [errors, setErrors] = useState<string>();
  const fileobj: any[] = [];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cropObj, setCropObj] = useState<any[]>([]);
  const [cropData, setCropData] = useState("#");
  // const [cropper, setCropper] = useState<any>();
	const [crop, setCrop] = useState<any[]>([]);
	const [previewCrop, setPreviewCrop] = useState<any[]>([]);
  const imageRef = useRef(null);

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

  //   useEffect(() => {

  // 	cropObj.push(cropData);
  // 	setCropObj([...cropObj]);

  //  }, [cropData]);

  // console.log(cropObj)

  // const getCropData = () => {
  // 	if (typeof cropper !== "undefined") {
  // 		cropper.getCroppedCanvas({
  // 			width: 300,
  // 			height: 300,
  // 			minWidth: 256,
  // 			minHeight: 256,
  // 			maxWidth: 4096,
  // 			maxHeight: 4096,
  // 			fillColor: "#fff",
  // 			imageSmoothingEnabled: false,
  // 			imageSmoothingQuality: "medium",
  // 		});

  // 		setCropData(cropper.getCroppedCanvas().toDataURL("image/jpeg"));

  // 	};
  // }

  const cropperRef = useRef<HTMLImageElement>(null);
  const onCrop = () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
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
		 setCropData(cropper.getCroppedCanvas());
		 setCrop(cropper.getCroppedCanvas().toDataURL("image/jpeg"))
		fetch(cropData)
		.then((res) => res.blob())
		.then((blob) => {
		  var fd = new FormData();
		  fd.append("image", blob, "filename");

		  console.log(blob);

		  // Upload
		  // fetch('upload', {method: 'POST', body: fd})
		});
    }
  };
	
	   useEffect(() => {

  	cropObj.push(cropData);
  	setCropObj([...cropObj]);
			previewCrop.push(crop);
			setPreviewCrop([...previewCrop])
		}, [cropData]);
	
	console.log(cropObj)
	console.log(previewCrop)

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
        console.log(files[i]);
      }
      const petId = sessionStorage.getItem("petId");
      setErrors(undefined);
      petsFetch(`https://api2.adoptpets.click/pets/${petId}/posts`, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
        },
        body: formData,
      })
        .then(() => {
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
	const OnCropper = (url: string) => {
	
			return (<div>
				<Cropper
					guides={false}
					ref={cropperRef}
					aspectRatio={1}
					src={url}
					style={{ height: "30%", width: "30%" }}
				/>
				<button onClick={onCrop}>Crop Image</button>
			</div>)
			
		
	}
	
	
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
					  <>
						  <img key={index} style={{ width: 400 }} src={url} onClick={()=>{OnCropper(url)}}/>
                  {/* <Cropper
                    guides={false}
                    
                    ref={cropperRef}
                    // style={{ height: "30%", width: "30%" }}
                    //   zoomTo={0}
                    //   key={index}
                    aspectRatio={1}
                    // preview=".img-preview"
                    src={url}
                    // viewMode={1}
                    // minCropBoxHeight={10}
                    // minCropBoxWidth={10}
                    // background={false}
                    // responsive={true}
                    //   autoCropArea={1}
                    //   ref={imageRef}
                    //   crop={() => { crop(index) }}
                    // checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                    // onInitialized={(instance) => {
                    // 	setCropper(instance);
                    //  }}
                    // guides={true}
                  />
                  <button onClick={onCrop}>Crop Image {index}</button> */}
                  {/* <img style={{ width: 400 }} src={cropData} alt="cropped" /> */}
                </>
              ))
            ) : (
              <div> Nothing added yet</div>
            )}
          </div>
          {previewCrop.length !== 1 
            ? (previewCrop || []).map((url) => (
                <img style={{ width: 400 }} src={url} alt="cropped" />
              ))
            : null}
        </div>
      </div>
      <Button onClick={createNewPost}>Add new post</Button>
      {errors && !(files[0].length !== 0 && text) ? (
        <div className={styles.errors}>{errors}</div>
      ) : null}
    </div>
  );
};
