import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../main/store";
import { useContext } from "react";
import WebSocketContext from "./socket";

export function WebSocketClient(){
    let user = useSelector((state) => state.userReducer.user) || {};
    let msgs = useSelector((state) => state.userReducer.notifications) || [];
    let ws = useContext(WebSocketContext); //tätä voi käyttää missä vain WebSockettina
    let dispatch = useDispatch();

    React.useEffect(() => {
        ws.onmessage = ev => {
            console.log(ev.data);
            if(user.id===ev.data) dispatch(addNotification(ev.data));
        }
    }, [])

    function sendMsg() {
        if (user.id){
            console.log(user.id + ", " + user.username + ", " + 'painoi nappia');
            ws.send(user.id);
       }
    }

    let rows = msgs.map(m => <p>{m}</p>) //tämä viesti ominaisuutena näkyviin

    return <div className="web-socket">
        <h2>WebSocket client</h2>
        <input type="button" value='Lähetä' onClick={sendMsg} />
        {rows}
    </div>
}