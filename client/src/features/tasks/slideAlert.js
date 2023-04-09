import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useUpdateTaskMutation,useGetTasksInProgressQuery,useGetPerformerTasksQuery } from '../../main/apiSlice';
import { useState } from 'react'
import ReviewDialog from '../reviews/reviewCont';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export function AlertDialogSlide({task},{user}) {
  const [open, setOpen] = React.useState(false)
  const [status, setStatus] = useState('done')
  const [mutate, { isLoading }] = useUpdateTaskMutation()
  const [reviewVisible, setReviewVisible] = React.useState(false) // review aluksi piilossa. Review jutut pitää siirtää oikeaan nappiin kun sellainen tulee task in progressiin
  const { data, isLoading: isTasksLoading, refetch: refetchPerformerTasks } = useGetPerformerTasksQuery(3)
  //const { created, isLoading: isCreatedLoading, refetch: refetchCreatedTasks  } = useGetCreatedTasksQuery(3)
  console.log({user})

  const handleClickOpen = () => {
    setOpen(true);
  };

  
/*
  const makeChange = async () => {
    setStatus('Done')
    await mutate({...task, status: 'Done', creatorId: task.creator.id, performerId: task.performer.id})
    refetchPerformerTasks();
  };
*/
  const Cancel = async () => {
    setStatus('In progress')
    await mutate({...task, status: 'In progress', creatorId: task.creator.id, performerId: task.performer.id})
    refetchPerformerTasks();
  };

  const handleClose1 = async () => {
    setOpen(false);
    await mutate({...task, status: 'done', creatorId: task.creator.id, performerId: task.performer.id});
    setReviewVisible(true);
  };

  const handleClose2 = () => {
    setOpen(false);
  };

  const handleClose3 = () => {
    setOpen(false);
    Cancel();
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
          <Button onClick={handleClose1} disabled={isLoading}>Agree</Button>
          <Button onClick={handleClose2}>Disagree</Button>
          <Button onClick={handleClose3} disabled={isLoading}>Cancel</Button>
        </DialogActions>
      </Dialog>
      {reviewVisible && <ReviewDialog performerId={task.performer.id} creatorId={task.creator.id} taskId={task.id} />}  {/* tekee reviewistä näkyvän kun agree klikattu*/}
    </div>
  );
}




  /*const makeChange = async () => {
    setStatus('Done')
    task.status = 'Done';
    await mutate({
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
      creatorId: task.creatorId,
      performerId: task.performerId
    })
  };*/