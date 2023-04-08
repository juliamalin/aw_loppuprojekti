import './App.css';
import { setSocket, store } from './main/store';
import { Provider, useDispatch } from "react-redux";
import Navbar, { Header } from './main/content'
import 'bootstrap/dist/css/bootstrap.min.css';
import { TaskContainer } from './features/tasks/taskContainer';
import { Profile } from './features/profiles/ProfilePage';
import { Main } from './main/content';
import { GoogleLogin } from './login/google';
import { Login } from './login/login';
import React from 'react';
import { addNotification } from './main/store';


function App() {
  let dispatch = useDispatch();

  React.useEffect(function() {
    console.log("WebSocket useEffect");
    let con = new WebSocket("ws://localhost:8080/my/uri");
    dispatch(setSocket(con));
    /*con.onopen=() => console.log("Opened connection");
    con.onclose=() => {
        con.close();
    }
    con.onmessage = ev => {
       console.log(ev.data)
       dispatch(addNotification(ev.data));
    }*/
}, []);

  return (

    <div className="App">
      <Navbar />
      <Main />
    </div>

  );
}

export default App;


