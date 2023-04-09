import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import { useCreateReviewMutation } from '../../main/apiSlice';
import { useSelector } from 'react-redux';


const labels = {
  1: 'Rotten Rodent',
  2: 'Hasty Hopper',
  3: 'Respectable Rabbit',
  4: 'Blessed Bunny',
  5: 'Heroic Hare',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function ReviewDialog({performerId, creatorId, taskId}) {
  const [open, setOpen] = useState(true);
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const [createReview] = useCreateReviewMutation();
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState();

  // const user = useSelector(state => state.userReducer.user) || {};


  const onSendClicked = () => {
    createReview({
      comment: comment,
      value: rating,
      targetuser_id: creatorId,
      performer_id: performerId,
      task_id: taskId
    }).unwrap().then(response => console.log(response));
    handleClose();
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Write honest feedback about the performance of the person performing the task. The evaluation will be visible to everyone.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Word is free!"
            type="description"
            fullWidth
            variant="standard"
            multiline
            rows={4}
            value={comment}
            onChange={handleCommentChange}
          />
          <Box
            sx={{
              width: 200,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Rating
              name="hover-feedback"
              value={value}
              precision={1}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button> 
          <Button onClick={onSendClicked}>Send review</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
