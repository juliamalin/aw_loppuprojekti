import React from "react";
import { TaskContainer } from "./taskContainer";
import {  useGetPerformerWithTasksByIdQuery} from "../../main/apiSlice";
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

export const MyTasks = ({profileId=1}) => {
    const {
        data: {tasks = []}={}, //This line of code is using destructuring assignment to extract the tasks array from the data object returned by the useGetPerformerWithTasksByIdQuery hook
        isLoading
    } =  useGetPerformerWithTasksByIdQuery(profileId);
    

    console.log(tasks) 
    
    return (
            <TableContainer component={Paper}>
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>Task</TableCell>
                    <TableCell align="left">Creator</TableCell>
                    <TableCell align="left">Status</TableCell>
                    <TableCell align="left">Location</TableCell>
                    <TableCell align="left">Payment</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map ((task)=> (
                    <Row key={task.id} task={task} />
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          );

}

//TableCell align="left">Description</TableCell>
