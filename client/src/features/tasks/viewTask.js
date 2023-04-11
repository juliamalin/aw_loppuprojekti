import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Alert, Typography } from '@mui/material';
import { useUpdateTaskMutation, useGetProfileByIdQuery } from '../../main/apiSlice';
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { id } from 'date-fns/locale';
import { TaskOutlined } from '@mui/icons-material';
import * as ReactDOM from "react-dom";
import { useNavigate } from 'react-router-dom';
import { TaskAlert } from './TaskAlert'
import WebSocketContext from '../../websocket/socket';
//import Popup from './Popup'; // assuming Popup is a component that renders the notification pop-up
//import { AlertTitle } from '@material-ui/lab';


function PaperComponent(props) {

  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog({ task, open, setOpen}) {
  let user = useSelector((state) => state.userReducer.user) || {};
  const [status, setStatus] = useState(task.status)
  const [alert, setAlert] = useState(null);
  let ws = useContext(WebSocketContext);


  const [changeStatus, { isLoading }] = useUpdateTaskMutation()

  const navigate = useNavigate()

  function wsSend() {
    ws.send(user.id + " 11");
  }




  const onTakeTask = async () => {
    setStatus('Taken by somebody')
    await changeStatus({
      id: task.id,
      status: 'unavailable',
      title: task.title,
      description: task.description,
      latitude: task.latitude,
      longitude: task.longitude,
      location: task.location,
      availableFrom: task.availableFrom,
      availableTo: task.availableTo,
      payment: task.payment,
      durationinminutes: task.durationinminutes,
      creatorId: 11,
      performerId: user.id
    })
    wsSend();
    setOpen(false)
  };

  /*const raisePopup = () => {
    return (
      <div className="popup">
        <div className="popup-content">
        <Alert severity="success">
        Your task has been taken!
        </Alert>
          <button>Close</button>
        </div>
      </div>
    );
  };*/
  //sivun päivitys???
  //creatorid???


  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        </DialogTitle>
        <DialogContent>

          <Typography variant="body1">
            Description: {task.description}
          </Typography>
          <Typography variant="body1">
            Location: {task.location}
          </Typography>
          <Typography variant="body1">
            Payment: {task.payment} €
          </Typography>
          <Typography variant="body1">
            Between: {task.availableFrom} to {task.availableTo}
          </Typography>
          <Typography variant="body1">
            Duration:{task.duration}
          </Typography>

        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onTakeTask}>Take Task</Button>
          <Button onClick={() => { setOpen(false); }}>
            Go Back
          </Button>
        </DialogActions>
        <TaskAlert task={task} />
      </Dialog>
    </div>
  );
}

//          <Button variant="contained" onClick={onTakeTask} onClick={}>Take Task
