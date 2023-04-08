import React from "react";
import { useGetCreatedTasksQuery, useGetPerformerWithTasksByIdQuery, useGetTasksInProgressQuery } from "../../main/apiSlice";
import { Row } from './taskTable'
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { MyTasksMap } from "../map/MyTasksMap";
import { useSelector } from "react-redux";


export const MyTasks = () => {
  const user = useSelector(state => state.userReducer.user) || {};
  const [taskTypes, setTaskTypes] = React.useState(() => ['inProgress', 'created']);
  const {
    data: tasksInProgress = [],
    isLoading
  } = useGetTasksInProgressQuery(user.id)

  const {
    data: tasksCreated = [],
  } = useGetCreatedTasksQuery(user.id)


  const handleTaskTypes = (event, newTaskTypes) => {
    setTaskTypes(newTaskTypes)
  }



  let tasks = []
  if (taskTypes.includes('inProgress')) tasks = tasksInProgress
  if (taskTypes.includes('created')) tasks = [...tasks, ...tasksCreated]

  console.log(tasksInProgress)
  console.log(tasksCreated)
  console.log(tasks)

  return (<div className="row">
    <div className="col-8">

      <ToggleButtonGroup
        value={taskTypes}
        onChange={handleTaskTypes}
        aria-label="text formatting"
      >
        <ToggleButton value="inProgress" >
          In Progress
        </ToggleButton>
        <ToggleButton value="created" >
          Created
        </ToggleButton>
      </ToggleButtonGroup>




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
            {tasks.map((task) => (
              <Row key={task.id} task={task} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    <div className="col-4">
      <MyTasksMap />
    </div>

  </div >

  );

}

//TableCell align="left">Description</TableCell>
