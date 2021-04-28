import { useEffect, useState } from 'react';
import firebase from 'firebase';
import { auth, db, storage } from './firebase.js';

function Header(props) {

     const [progress, setProgress] = useState(0);

     const [file, setFile] = useState(null);    

     

     useEffect(() => {
          
          

     }, [])

     function criarConta(e) {
          e.preventDefault();
          //Pegando os valores
          let email = document.getElementById('email-cadastro').value;
          let username = document.getElementById('username-cadastro').value;
          let senha = document.getElementById('senha-cadastro').value;

          // Criar Conta Firebase
          auth.createUserWithEmailAndPassword(email, senha)
          .then((authUser)=>{
               authUser.user.updateProfile({
                    displayName: username 
               })
               props.setUser(auth.user.displayName);

               alert('Conta Criada Com Sucesso, '+ username);
          }).catch((error)=>{
               alert(error.message)
          });
     }

     function logar(e) {
          e.preventDefault();
          let email = document.getElementById('email-login').value;
          let senha = document.getElementById('senha-login').value;

          auth.signInWithEmailAndPassword(email, senha)
               .then((auth) => {
                    props.setUser(auth.user.displayName);

                    alert("Logado com Sucesso")
               }).catch((error) => {
                    alert(error.message)
               });
     }

     function uploadPost(e) {
          e.preventDefault();

          let tituloPost = document.getElementById("titulo-upload").value;
          let progressEl = document.getElementById("progress-upload");

          const uploadTask = storage.ref(`images/${file.name}`).put(file);

          uploadTask.on("state_changed", (snapshot)=>{
               const progress = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
               setProgress(progress)
          }, function(error){
               console.log(`Ocorreu um Erro!: \n\n`)
          }, () => {
               storage.ref("images").child(file.name).getDownloadURL()
               .then(function(url) {
                    db.collection('posts').add({
                         titulo: tituloPost,
                         image: url,
                         username: props.user,
                         timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })

                    setProgress(0);
                    setFile(null);

                    alert("Post realizado com sucesso!");
                    window.location.href = "/";

                    document.getElementById("form-upload").reset();
               })
          })
     }

     function abrirModalPost(e) {
          e.preventDefault();

          let modal = document.querySelector(".modalPost");
          modal.style.display = "Block";
     }

     function fecharModalPost() {
          let modal = document.querySelector(".modalPost");
          modal.style.display = "None";
     }

     function abrirModalCriarConta(e) {
          e.preventDefault();
          
          let modal = document.querySelector(".modalCriarConta");
          modal.style.display = "Block";
     }

     function fecharModalCriarConta() {
          let modal = document.querySelector(".modalCriarConta");
          modal.style.display = "None";
     }

     function deslogar(e) {
          e.preventDefault();

          auth.signOut().then((val)=>{
               props.setUser(null);
               window.location.href = "/";
          });
     }


     return (
     
     <div className="header">

          <div className="modalCriarConta">
               <div className="formCriarConta">
                    <div onClick={(e)=>fecharModalCriarConta(e)} className="close-modal-criar">X</div>
                    <h2>Criar Conta</h2>
                    <form onSubmit={(e)=>criarConta(e)}>
                              <input id="email-cadastro" type="email" placeholder="Seu Email. . ." />
                              <input id="username-cadastro" type="username" placeholder="Nome de Usuario. . ." />
                              <input id="senha-cadastro" type="password" placeholder="Senha. . ." />
                              <input type="submit" value="Criar Sua Conta" />
                    </form>     
               </div>     
          </div> {/* Modal Criar Conta*/}

               <div className="modalPost">
                    <div className="formPost">
                         <div onClick={(e) => fecharModalPost(e)} className="close-modal-post">X</div>
                         <h2>Fazer um Post</h2>
                         <form id="form-upload" onSubmit={(e) => uploadPost(e)}>
                              <input id="titulo-upload" type="text" placeholder="Título da Sua Foto. . ." />
                              <input onChange={(e)=>setFile(e.target.files[0])} name="file" type="file"  />
                              <progress id="progress-upload" value={progress}></progress>
                              <input type="submit" value="Postar" />
                         </form>
                    </div>
               </div> {/* Modal Post*/}

          <div className="center">
               <div className="header__logo">
                         <a href="/"><img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" /></a>
               </div> {/* Header Logo */}
                    {
                    (props.user) ?
                    <div className="header__logadoInfo">
                              <span>Olá, <b>{props.user}</b>!</span>
                              <a onClick={(e)=>abrirModalPost(e)} href="#" className="btn__post">Postar</a>
                                   <a onClick={(e) => deslogar(e)} href="#" className="btn__loggout">Deslogar</a>
                    </div>
:
                    <div className="header__loginForm">
                         <form onSubmit={(e)=>logar(e)}>
                         <input id="email-login" type="email" placeholder="Login. . ." />
                         <input id="senha-login" type="password" placeholder="Senha. . . " />
                         <input  type="submit" name="acao" value="Logar" />
                         </form>
                    <div className="btn__criarConta">
                              <a onClick={(e)=>abrirModalCriarConta(e)} href="#">Criar Conta</a>
                    </div>
                    </div> /* Header Login */
               }

          </div>
     </div>
     )
}

export default Header;