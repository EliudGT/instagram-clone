import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post";
import { auth, db } from "./firebase";
import { makeStyles } from "@mui/styles";
import Modal from "@mui/material/Modal";
import { Button, Input } from "@mui/material";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `tranlated(-${top}%,-${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,

    border: "2px solid #000",
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() =>{
    const unsuscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser){
        //uses has ogged in...
        console.log(authUser);
        setUser(authUser);

      } else{
        //user has logged ou...
        setUser(null);
      }
    })

    return  () => {
      unsuscribe();
    }
  },[user, username]);


  useEffect(() => {
    //this is where the code runs
    db.collection("posts").onSnapshot((snapshot) => {
      //every time a new post is added. this code firebase
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((auth) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message))
  };

  return (
    <div className="App">

      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center className="app__signup">
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
                className="app__headerImage"
              />
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" onClick={signUp}>Sign Up</Button>
            </center>
          </form>
        </div>
      </Modal>

      <Button onClick={() => setOpen(true)}>Sign up</Button>

      <h1>Hola</h1>

      {/*conm el sigueinte codigio se cargn toda la info que existe en la base de datos.*/}
      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
}

export default App;
