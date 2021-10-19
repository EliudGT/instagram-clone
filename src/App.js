
import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import  { db } from './firebase';


function App() { 
  const [posts, setPosts] = useState ([
    {
      username: "Oscar",
      caption: "Wowit work",
      imageUrl:"https://ep1.pinkbike.org/p2pb21499691/p2pb21499691.jpg"
    },
    {
      username: "Oscar",
      caption: "Wowit work",
      imageUrl:"https://ep1.pinkbike.org/p2pb21499691/p2pb21499691.jpg"
    }
  ]);

  useEffect (() =>{
    db.collection('posts').onSnapshot(snapshot => {
    //every time a new post is added. this code firebase
    setPosts(snapshot.docs.map(doc => doc.data()));
    })
    
  }, []);

  return (
    <div className="App">
      <div className="app__header">
        <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" className="app__headerImage" />
      </div>
      <h1>Hola</h1>
      {
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }
      <Post username="Oscar" caption="Wowit work" imageUrl="https://ep1.pinkbike.org/p2pb21499691/p2pb21499691.jpg"/>
      <Post username="Adriana" caption="Adriana caption" imageUrl="https://ep1.pinkbike.org/p6pb21489098/p6pb21489098.jpg"/>
      <Post username="Eliud" caption="Eliud caption" imageUrl="https://ep1.pinkbike.org/p6pb21489218/p6pb21489218.jpg"/>
    </div>
    
  );
}

export default App;
