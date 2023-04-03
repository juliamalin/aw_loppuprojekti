import React from 'react';
import jwt_decode from "jwt-decode";

function App() {

  //Saa kirjautuessaan käyttäjän tiedot, VAIN TESTIYMPÄRISTÖSSÄ LISÄTYT EMAILIT TOIMII
  function handleCallBackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    let userObject = jwt_decode(response.credential);
    console.log(userObject);
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
      </div>
    )
}
export default App;