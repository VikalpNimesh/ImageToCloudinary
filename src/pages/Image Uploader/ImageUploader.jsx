import React, { useState } from "react";
import "./ImageUploader.css";

const ImageUploader = () => {
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const handleUpload = async () => {
    if (!image) {
      alert("No image selected");
      return;
    }
    console.log("process start");
  
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "my_store");
    formData.append("cloud_name", "dwtaizeop");
  
    try {
      console.log("process api");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dwtaizeop/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
  
      if (!res.ok) {
        console.log("ds");
        throw new Error("Failed to upload image");
      }
  
      const cloudData = await res.json();
      setUrl(cloudData.url);
      console.log(url);

    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again later.");
    }
  };
  

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="image">
      <div>
        <label htmlFor="inputimage">
          {!image ? (
            <img
              src="https://cdn-icons-png.flaticon.com/128/6499/6499530.png"
              alt=""
            />
          ) : (
            <img src={URL.createObjectURL(image)} alt="img" />
          )}
        </label>
      </div>

      <input
        type="file"
        id="inputimage"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUploader;
