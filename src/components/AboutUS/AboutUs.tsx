import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const defaultSrc =
  "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

export const AboutUs = () => {
  const [images, setImages] = useState(defaultSrc);
  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();
  const onChange = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImages(reader.result as any);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };
	
	const canv = () => {
		cropper.getCroppedCanvas({
			minWidth: 256,
			minHeight: 256,
			maxWidth: 4096,
			maxHeight: 4096,
			fillColor: '#fff',
			imageSmoothingEnabled: true,
			imageSmoothingQuality: 'high',
		});
		
		cropper.getCroppedCanvas().toBlob(function (blob: Blob) {
			var formData = new FormData();
			formData.append('upload', blob, 'imagetest.jpeg');
		console.log(blob)
		}, 'image/jpeg', 1);
	}
	
  
  

  // 	// Use `jQuery.ajax` method
  // 	$.ajax('/path/to/upload', {
  // 		method: "POST",
  // 		data: formData,
  // 		processData: false,
  // 		contentType: false,
  // 		success: function () {
  // 			console.log('Upload success');
  // 		},
  // 		error: function () {
  // 			console.log('Upload error');
  // 		}
  // 	});
  // }

  return (
    <div>
      <div style={{ width: "100%" }}>
        <input type="file" onChange={onChange} />
        <button>Use default img</button>
        <br />
        <br />
        <Cropper
          style={{ height: "30%", width: "30%" }}
          zoomTo={0}
				  aspectRatio={1}
				 
          preview=".img-preview"
          src={images}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={false}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={false}
        />
      </div>
      <div>
        <div style={{ width: "50%", float: "right" }}>
          <h1>Preview</h1>
          <div style={{ width: "100%", float: "left", height: "300px" }} />
        </div>
        <div style={{ width: "50%", float: "right", height: "300px" }}>
          <h1>
            <span>Crop</span>
            <button style={{ float: "right" }} onClick={getCropData}>
              Crop Image
            </button>
          </h1>
				  <img style={{ width: 400 }} src={cropData} alt="cropped" />
				  <button style={{ float: "right" }} onClick={canv}>
              canv
            </button>
        </div>
      </div>
      <br style={{ clear: "both" }} />
    </div>
  );
};
