import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Alert, Typography } from '@mui/material';
import { useUpdateTaskMutation,useGetProfileByIdQuery} from '../../main/apiSlice';
import { useDispatch} from 'react-redux'
import { useState } from 'react'
import { id } from 'date-fns/locale';
import { TaskOutlined } from '@mui/icons-material';
import * as ReactDOM from "react-dom";
import { useNavigate } from 'react-router-dom';
import { TaskAlert } from './TaskAlert'
import Popup from './Popup'; // assuming Popup is a component that renders the notification pop-up
//import { AlertTitle } from '@material-ui/lab';


function ViewTask(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog({task}) {
  const [open, setOpen] = React.useState(false)
  const [status, setStatus] = useState(task.status)
  const [alert, setAlert] = useState(null);

  const [changeStatus,{isLoading}] = useUpdateTaskMutation()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate()

  const onTakeTask = async () => {
    setStatus('Taken by somebody')
     await changeStatus({
      id:task.id, 
      status, 
      title:task.title, 
      description:task.description, 
      latitude:task.latitude, 
      longitude:task.longitude, 
      location:task.location,
      availableFrom:task.availableFrom, 
      availableTo:task.availableTo,
      payment:task.payment,
      durationinminutes:task.durationinminutes,
      creatorId:1,
      performerId: task.performerId })
      handleClose();
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
      <Button
        className="button muted-button"
        variant="outlined"
        onClick={handleClickOpen}>
        View Task
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={ViewTask}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body1">
              Description: {task.description}
            </Typography>
            <Typography variant="body1">
              Location: {task.location}
            </Typography>
            <Typography variant="body1">
              Payment: {task.payment} e
            </Typography>
            <Typography variant="body1">
              Between: {task.availableFrom} to {task.availableTo}
            </Typography>
            <Typography variant="body1">
              Duration:{task.duration}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onTakeTask}>Take Task</Button>
          <Button autoFocus onClick={handleClose}>
            Go Back
          </Button>
        </DialogActions>
        <TaskAlert task={task}/>
      </Dialog>
    </div>
  );
}

//          <Button variant="contained" onClick={onTakeTask} onClick={}>Take Task
