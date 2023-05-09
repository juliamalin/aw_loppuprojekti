
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNotification, deleteNotification } from "../main/store";
import { useContext } from "react";
import WebSocketContext from "./socket";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';


export function WebSocketClient(){
    let user = useSelector((state) => state.userReducer.user) || {};
    let msgs = useSelector((state) => state.userReducer.notifications) || [];
    let ws = useContext(WebSocketContext); //tätä voi käyttää missä vain WebSockettina
    let dispatch = useDispatch();
    

    React.useEffect(() => {
        console.log(msgs);
        ws.onmessage = ev => {
            console.log(ev.data);
            let data = ev.data.split(" ");
            let msg = null;
            if (data.length == 2) {
                msg = data[0] + " suoritti juuri tehtävän!";
            } else {
                console.log(data);
                msg = "Käyttäjä " + data[0] + " otti tehtävänne !";
            }
            if(user.id==data[1]) dispatch(addNotification(msg));
        }
    }, [])

    function dltNotification(id) {
        console.log(id);
        dispatch(deleteNotification(id));
    }

    let rows = msgs.map(m => <nav aria-label="main mailbox folders">
        <ListItem key={m.id} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
              <ListItemText primary={m} onClick={() => dltNotification(m)} />
          </ListItemButton>
        </ListItem>
    </nav>)





    return <div className="web-socket">
        <h2>Ilmoitukset</h2>
        {rows}
    </div>
}