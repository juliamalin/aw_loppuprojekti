import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Typography } from '@mui/material';


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
        PaperComponent={ViewTask}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {task.title}
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
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}