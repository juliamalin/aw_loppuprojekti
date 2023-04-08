import React from "react";
import { TaskContainer } from "./taskContainer";
import {    useGetCreatedTasksQuery,   useGetTasksInProgressQuery, useGetUserQuery } from "../../main/apiSlice";
import { TimeAgo } from './timeAgo'
import DraggableDialog from "./viewTask";
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import { Row } from './taskTable'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import './mytasksstyles.css';
import { useState } from 'react'
import { useSelector } from "react-redux";
//import { MyTasksMap } from "../map/MyTasksMap";





export const MyTasks = () => {
    const { data: user = [], isLoading: isLoadingUser} =   useGetUserQuery();
    //const user = useSelector(state => state.userReducer.user) || {};

    const { data: createdTasks = [], isLoading: isLoadingCreatedTasks } = useGetCreatedTasksQuery(user.id);
    const { data: performerTasks = [], isLoading: isLoadingPerformerTasks} = useGetTasksInProgressQuery(user.id);

  console.log(user)
        //tulee päivittää tieto statuksen muutoksesta saman tien


  const [showPerformedTasks, setShowPerformedTasks] = useState(true);
  const [showCreatedTasks, setShowCreatedTasks] = useState(false);
  const [activeButton, setActiveButton] = useState('created');


  console.log(createdTasks) 
  console.log(performerTasks) 


  const handlePerformedTasksClick = () => {
    setShowPerformedTasks(true);
    setShowCreatedTasks(false);
    setActiveButton('performed');
  };

  const handleCreatedTasksClick = () => {
    setShowPerformedTasks(false);
    setShowCreatedTasks(true);
    setActiveButton('created');
  };


  return (
    <div>
      <h1 className="my-tasks-heading" style={{ marginBottom: '20px',marginLeft: '10px' }}>My Tasks</h1>
      <ButtonGroup class="buttongroup" color="secondary" style={{ marginBottom: '20px',marginLeft: '10px' }}>
        <Button variant={activeButton === 'created' ? 'contained' : 'outlined'} onClick={handleCreatedTasksClick}>Created tasks</Button>
        <Button variant={activeButton === 'performed' ? 'contained' : 'outlined'} onClick={handlePerformedTasksClick}>Performed tasks</Button>
      </ButtonGroup>
      <TableContainer class="txtb" component={Paper}>
        <Table  aria-label="collapsible table">
          <TableHead>
            <TableRow >
              <TableCell class="cell" />
              <TableCell class="cell" >Task</TableCell>
              <TableCell class="cell" align="left">Creator</TableCell>
              <TableCell class="cell" align="left">Status</TableCell>
              <TableCell class="cell" align="left">Location</TableCell>
              <TableCell class="cell" align="left">Payment</TableCell>
              <TableCell class="cell" align="left">Progress</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {showPerformedTasks &&
              performerTasks
                .filter((task) => task.performer.id === user.id)
                .map((task) => <Row key={task.id} task={task} />)}
            {showCreatedTasks &&
              createdTasks
                .filter((task) => task.creator.id === user.id)
                .map((task) => <Row key={task.id} task={task} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
