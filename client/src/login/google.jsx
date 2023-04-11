import React from 'react';
import jwt_decode from "jwt-decode";
import { useState } from 'react';
import { useCreateGoogleUserMutation } from '../main/apiSlice';

export function GoogleLogin() {
  let [ user, setUser ] = useState("");
  let [ token, setToken] = useState("");
  const [createUser] = useCreateGoogleUserMutation();

  function signOut() {
    setUser("");
    document.getElementById("signInDiv").hidden = false;
  }

  /*function create() {
    let u = {token: token};
    createUser(u).unwrap()
      .then((payload) =>
  }*/

  //Saa kirjautuessaan käyttäjän tiedot, VAIN TESTIYMPÄRISTÖSSÄ LISÄTYT EMAILIT TOIMII
  function handleCallBackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject.name);
    setToken(userObject.sub);
    console.log(user);
    console.log(token);
    document.getElementById("signInDiv").hidden = true;
  }

  React.useEffect(() => {
    /* global google */
    
    google.accounts.id.initialize({
      client_id: "1051092928864-nkgf2cp4biii83l9qmc4ubq351d4e62j.apps.googleusercontent.com",
      callback: handleCallBackResponse
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    );
  }, []);

    return (
      <div>
        <div id="signInDiv"></div>
        {Object.keys(user).length != 0 &&
          <button onClick={() => signOut()} >Kirjaudu ulos</button>
        }
        {user &&
        <div>
          <h3>{user}</h3>
        </div>
        }
      </div>
    )
}

