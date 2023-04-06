import React from 'react';
import jwt_decode from "jwt-decode";
import { useState } from 'react';

export function GoogleLogin() {
  const [ user, setUser ] = useState({});

  function signOut() {
    setUser({});
    document.getElementById("signInDiv").hidden = false;
  }

  //Saa kirjautuessaan käyttäjän tiedot, VAIN TESTIYMPÄRISTÖSSÄ LISÄTYT EMAILIT TOIMII
  function handleCallBackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
    console.log(userObject.sub)
    setUser(userObject);
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
          <img src={user.picture}></img>
          <h3>{user.name}</h3>
        </div>
        }
      </div>
    )
}

