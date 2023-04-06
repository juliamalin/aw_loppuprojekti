import React from "react";

export function WebSocketClient() {
    let [ connection, setConnection ] = React.useState(null);

    React.useEffect(function() {
        console.log("WebSocket UseEffect");
        let con = new WebSocket("ws://localhost:8080/my/uri");
        con.onopen = () => {
            console.log("Connection open");
            con.send("Moikka");
        }
        con.onmessage = (ev) => console.log(ev.data);
        con.onclose=() => {
            con.close();
            setConnection(null);
        }
        con.onerror=() => setConnection(null);
        return () => {
            console.log("Closing");
            con.close();
        }
    }, [connection])
    

    return <div>
        <h2>Moi</h2>
    </div>
}