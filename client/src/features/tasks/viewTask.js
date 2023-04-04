import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
// import Draggable from 'react-draggable';

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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        aria-labelledby="draggable-dialog-title"
        ViewTask={ViewTask}
      >
        <DialogTitle 
        tyle={{ cursor: 'move' }} 
        id="draggable-dialog-title">
          {task.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <p>Description: {task.description}</p>
            <p>Location: {task.location}</p>
            <p>Payment: {task.payment} e</p>
            <p>Between: {task.availableFrom} to {task.availableTo}</p>
            <p>Duration:{task.duration}</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}