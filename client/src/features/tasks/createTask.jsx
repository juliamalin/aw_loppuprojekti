import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Grid } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { useCreateTaskMutation } from '../../main/apiSlice';


export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [selectedStartDate, setSelectedStartDate] = React.useState(null);
    const [selectedEndDate, setSelectedEndDate] = React.useState(null);
    const [createTask] = useCreateTaskMutation();
    const [task, setTask] = React.useState({});

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        const title = document.getElementById('title')?.value;
        const description = document.getElementById('description')?.value;
        const location = document.getElementById('location')?.value;
        const availableFrom = selectedStartDate;
        const availableTo = selectedEndDate;
        const payment = document.getElementById('payment')?.value;
        const durationinminutes = document.getElementById('duration')?.value;

        updateTask({
            title: title,
            description: description,
            status: "available",
            latitude: 60.1,
            longitude: 24.9,
            location: location,
            availableFrom: availableFrom,
            availableTo: availableTo,
            payment: payment,
            durationinminutes: durationinminutes,
            creatorId: 1
        });
        setOpen(false);
        return {
            title: title,
            description: description,
            status: "available",
            latitude: 60.1,
            longitude: 24.9,
            location: location,
            availableFrom: availableFrom,
            availableTo: availableTo,
            payment: payment,
            durationinminutes: durationinminutes,
            creatorId: 1
        }
    };

    const updateTask = (newValue) => {
        setTask({ ...task, ...newValue });
    };

    const handleStartDateChange = (date) => {
        setSelectedStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setSelectedEndDate(date);
    };
    /*
        const newTask = {
            title: "imurointi",
            description: "imuroi mun koti",
            status: "available",
            location: "Mannerheimintie 3",
            available_from: "",
            available_to: "",
            payment: 30,
            creatorId: 1
        }
    */
    return (
        <div>
            <Fab color="secondary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create a task!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Write a title that describes shortly your task!
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="title"
                        fullWidth
                        variant="standard"
                    />
                    <TextField

                        margin="dense"
                        id="description"
                        label="Description"
                        type="description"
                        fullWidth
                        variant="outlined"
                        multiline
                        rows={4}

                    />
                    <TextField

                        margin="dense"
                        id="location"
                        label="Location"
                        type="location"
                        fullWidth
                        variant="standard"
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    format="dd/MM/yyyy HH:mm"
                                    margin="dense"
                                    id="startDateTime"
                                    label="Starting date and time"
                                    value={selectedStartDate}
                                    onChange={handleStartDateChange}
                                    fullWidth
                                    variant="standard"
                                    textField={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DateTimePicker
                                    format="dd/MM/yyyy HH:mm"
                                    margin="dense"
                                    id="endDateTime"
                                    label="Ending date and time"
                                    value={selectedEndDate}
                                    onChange={handleEndDateChange}
                                    fullWidth
                                    variant="standard"
                                    textField={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="dense"
                                    id="duration"
                                    label="Duration"
                                    type="duration"
                                    fullWidth
                                    variant="outlined"
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="dense"
                                    id="payment"
                                    label="Payment"
                                    type="number"
                                    fullWidth
                                    variant="outlined"
                                    inputProps={{ pattern: "[0-100]*" }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        createTask(handleClose()).unwrap().then(response => console.log(response));

                    }}>Create</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

/*
<Button onClick={() => {
    createTask(updateTask()).unwrap().then(response => console.log(response));
    handleClose();
}}>Create</Button>
*/