import React, { useState } from "react";
import { Button } from "@mui/material";
import { storage, db } from "./firebase";
import firebase from "@firebase/app-compat";
import './ImageUpload.css';

const ImagenUpload = ({username}) => {
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
        "state_changed",
        (snapshot) => {
            //progress function
            const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgress(progress);
        },
        (error) => {
            //Error function
            console.log(error);
            alert(error.message);
        },
        () => {
            //complete function
            storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(url => {
                //post image inside db
                db.collection("posts").add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    cpation: caption,
                    imageUrl: url,
                    username: username
                });
                setProgress(0);
                setCaption('');
                setImage(null);
            });

        }
    );
  };

  return (
    <div className="imageUpload">
      <progress className="imagenupload__progresss" value={progress} max="100" />
      <input
        type="text"
        placeholder="Enter caption ..."
        onChange={(event) => setCaption(event.target.value)}
        value={caption}
      />
      <input type="file" onChange={handleChange} />
      <Button style={{ background: "#fafafe" }} onClick={handleUpload}>
        Upload
      </Button>
    </div>
  );
};

export default ImagenUpload;
