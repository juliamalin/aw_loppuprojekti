import React from "react";
/*import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../main/store";

export function WebSocketClient(){
    let user = useSelector((state) => state.userReducer.user) || {};
    let msgs = useSelector((state) => state.userReducer.notifications) || [];
    let con = new WebSocket("ws://localhost:8080/my/uri");

    let dispatch = useDispatch();

    React.useEffect(function() {
        console.log("WebSocket useEffect");
        con.onopen = () => console.log("WebSocket open");
        con.onmessage = ev => {
            console.log(ev.data);
            dispatch(addNotification(ev.data));
        }
        return () => {
            console.log("Closing");
            con.close();
        }
    }, []);

    function sendMsg() {
        console.log(user.id + ", " + user.username + ", " + 'painoi nappia');
        con.send(user.id + ", " + user.username + ", " + 'painoi nappia');
    }

    let rows = msgs.map(m => <p>{m}</p>)

    return <div className="web-socket">
        <h2>WebSocket client</h2>
        <input type="button" value='Lähetä' onClick={sendMsg} />
        {rows}
    </div>
}*/

const WebSocketContext = React.createContext(null);

export default WebSocketContext;
