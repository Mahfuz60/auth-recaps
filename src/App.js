import "./App.css";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { useState } from "react";
!firebase.apps.length && firebase.initializeApp(firebaseConfig);

function App() {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const ghProvider = new firebase.auth.GithubAuthProvider();

  const [user, setUser] = useState({});
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        const user = result.user;
        setUser(user);
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        console.log(errorMessage, errorCode, email);
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
  const handleFbSignIN = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;
        const user = result.user;
        var accessToken = credential.accessToken;
        setUser(user);
        console.log("fb used sign in", user);
      })
      .catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        console.log(errorMessage, errorCode, email);
        var credential = error.credential;
      });
  };

  const handleGithubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(ghProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
        console.log('github sign In',user);
        
      })
      .catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        console.log('Error:',errorMessage, errorCode, email);
      });
  };

  return (
    <div className="App">
      <button onClick={handleSignIn}>Sign in Google</button>
      <br /> <br />
      <button onClick={handleFbSignIN}>Sign in Facebook</button>
      <br /> <br />
      <button onClick={handleGithubSignIn}>Sign in Github</button>
      <br />
      <h4>Name:{user.displayName}</h4>
      <h4>Email:{user.email}</h4>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
