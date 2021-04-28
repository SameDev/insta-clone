import firebase from 'firebase';
import { db } from './firebase.js';
import { useEffect, useState } from 'react';

const Post = (props) => {

     const [comentarios, setComentarios] = useState([]);

     useEffect(()=>{
          db.collection('posts').doc(props.id).collection('comentarios').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
               setComentarios(snapshot.docs.map((document) => {
                    return { id: document.id, info: document.data() }
               }))
          })
     }, [])

     function comentar(id, e) {
          e.preventDefault();

          let comentarioAtual = document.getElementById('comentario-'+id).value; 

          db.collection("posts").doc(id).collection('comentarios').add({
               nome: props.user,
               comentario: comentarioAtual,
               timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })

          let comForm = document.getElementById("comForm");
          comForm.reset();

          alert("Comentario feito com sucesso")
     }

     return (
          <div className="center">
               <div className="postSingle">
                    <img src={props.info.image} />
                    <p><b>{props.info.username}</b>: {props.info.titulo}</p>

                    <div className="coments">
                         {
                              comentarios.map((val)=>{
                                   return (
                                        <div className="coments-single">
                                             <hr/><p><b>{val.info.nome}</b>: {val.info.comentario}</p>
                                        </div>
                                   )
                              })
                         }
                    </div>

                    {
                         (props.user)?
                              <form id="comForm" onSubmit={(e) => comentar(props.id, e)}>
                                   <textarea placeholder="Comente algo. . ." id={"comentario-" + props.id}></textarea>
                                   <input type="submit" value="Comentar" />
                              </form>
                         :
                         <div></div>
                    }
               </div>
          </div>
     )
}

export default Post;