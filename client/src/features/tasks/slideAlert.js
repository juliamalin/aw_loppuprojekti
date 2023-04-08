import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useUpdateTaskMutation} from '../../main/apiSlice';
import { useState } from 'react'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function AlertDialogSlide({task}) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState(task.status)

  const [changeStatus, { isLoading }] = useUpdateTaskMutation()
      //vaihda oikea get-pyyntö
      //poistaa taskin kun status päivittynyt??? (ja kun sivua päivittää)


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose2 = () => {
    setOpen(false);

  };

  const makeChange = async () => {
    setStatus('Done')
    await changeStatus({
      id: task.id,
      status: 'done',
      title: task.title,
      description: task.description,
      latitude: task.latitude,
      longitude: task.longitude,
      location: task.location,
      availableFrom: task.availableFrom,
      availableTo: task.availableTo,
      payment: task.payment,
      durationinminutes: task.durationinminutes,
      creatorId: 1,
      performerId: task.performerId
    })
  };

  const handleClose1 = () => {
    setOpen(false);
    makeChange();
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Change Status
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose2}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Do you want to mark task completed?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose2}>Disagree</Button>
          <Button onClick={handleClose1}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}