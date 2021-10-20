
import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import  { db } from './firebase';
import { makeStyles } from '@mui/styles';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';


function getModalStyle() {
  const top = 50 ;
  const left = 50 ;

  return{
    top: `${top}%`,
    left: `${left}%`,
    transform: `tranlated(-${top}%,-${left}%)`,
    
  };
}

const useStyles = makeStyles ((theme) =>({
  paper: {
    position: 'absolute',
    width: 400,
    
    border: '2px solid #000',
    
  },
}));



function App() { 
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [posts, setPosts] = useState ([]);
  const [open, setOpen] = useState(false)
  

  useEffect (() =>{
    //this is where the code runs
    db.collection('posts').onSnapshot(snapshot => {
    //every time a new post is added. this code firebase
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
    
  }, []);

  const signUp = (event) => {

  }


  return (
    <div className="App">

      <Modal
      open={open}
      onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
        
        </div>
        
      </Modal>

      <div className="app__header">
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="app__headerImage" />
      </div>

      <Button onClick={() => setOpen(true)}>Login</Button>

      <h1>Hola</h1>

      {/*conm el sigueinte codigio se cargn toda la info que existe en la base de datos.*/}
      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
    </div>
    
  );
}

export default App;
