import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "../main/store";

export function WebSocketClient(){
    let msgs = useSelector((state) => state.userReducer.notifications) || [];
    let socket = useSelector((state) => state.userReducer.socket);
    let dispatch = useDispatch();

    React.useEffect(() => {
        socket.onmessage = ev => {
            console.log(ev.data)
            dispatch(addNotification(ev.data));
        }
    }, [])

    let rows = msgs.map(m => <p>{m}</p>)

    return <div className="web-socket">
        <h2>WebSocket client</h2>
        {rows}
    </div>
}
