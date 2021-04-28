import './App.css';
import { db, auth } from './firebase.js';
import { useEffect, useState } from 'react';

import Header from './Header';
import Post from './Post';

function App() {

  const [user, setUser] = useState(null);

  const [post, setPosts] = useState([]);

  useEffect(()=>{
    auth.onAuthStateChanged((val) => {
        if (val != null) {
            setUser(val.displayName);
        }
    })


    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((document)=>{
        return {id:document.id, info: document.data()}
      }))
    })
  }, [])

  

  return (
    <div className="App">
      <Header setUser={setUser} user={user}></Header>
      {
        (user)?
        post.map(function(val) {
          return (
           <div>
              <Post user={user} info={val.info} id={val.id} />
           </div>
          )
        })
        : <div className="div__noLogin">
          <h1>Faça Login, para visualizar o feed!</h1>
        </div>
      }
    </div>
  );
}

export default App;
