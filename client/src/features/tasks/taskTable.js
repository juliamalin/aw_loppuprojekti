import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react'
import { useUpdateTaskMutation} from '../../main/apiSlice';
import { AlertDialogSlide } from './slideAlert'


export function Row({task}) {
    //const [status, setStatus] = useState(task.status)
    //const [performerId, setPerformerid] = useState(task.status)
    //console.log(status)

    //const [changeStatus, { isLoading }] = useUpdateTaskMutation()
    //vaihda oikea get-pyyntö

    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow style={{ position: 'relative'}}>
          <TableCell  style={{ borderBottom: 'none' }}>
            <IconButton 
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
              style={{ color: 'violet' }}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell class="lowercell" component="th" scope="row">
            {task.title}
          </TableCell>
          <TableCell class="lowercell" align="left">{task.cretorId}</TableCell>
          <TableCell class="lowercell" align="left">{task.status}</TableCell>
          <TableCell class="lowercell" align="left">{task.location}</TableCell>
          <TableCell class="lowercell" align="left" >{task.payment}</TableCell>
          <TableCell class="lowercell" align="left" style={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}} >
            <AlertDialogSlide task={task}></AlertDialogSlide></TableCell> 

        </TableRow>
        <TableRow >
          <TableCell style={{ paddingBottom: 0, paddingTop: 0, paddingLeft: '115px' }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography class="lowertitle" variant="h6" gutterBottom component="div">
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow style={{ backgroundColor: '#E5E5E5' }}>
                    <TableCell class="lowertext">Created</TableCell>
                      <TableCell class="lowertext" align="left">Start Date</TableCell>
                      <TableCell class="lowertext" align="left">End Date</TableCell>
                      <TableCell class="lowertext" align="left">Description</TableCell>
                      <TableCell class="lowertext" align="left">Duration (min)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ backgroundColor: '#f5e6fa' }}>
                      <TableRow key={task.created}>
                        <TableCell class="lowercell" component="th" scope="row">{task.created}</TableCell>
                        <TableCell class="lowercell" >{task.availableFrom}</TableCell>
                        <TableCell class="lowercell" >{task.availableTo}</TableCell>
                        <TableCell class="lowercell" >{task.description}</TableCell>
                        <TableCell class="lowercell" >{task.durationinminutes}</TableCell>
                      </TableRow>
                  </TableBody>
                  </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
  Row.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };
  

//                    {task.history.map((taskRow) => (,                     ))}


//status muualle



/*<Table size="small" aria-label="purchases">
<TableHead>
  <TableRow>
    <TableCell>Date</TableCell>
    <TableCell>Customer</TableCell>
    <TableCell align="right">Amount</TableCell>
    <TableCell align="right">Total price ($)</TableCell>
  </TableRow>
</TableHead>
<TableBody>
  {row.history.map((historyRow) => (
    <TableRow key={historyRow.date}>
      <TableCell component="th" scope="row">
        {historyRow.date}
      </TableCell>
      <TableCell>{historyRow.customerId}</TableCell>
      <TableCell align="right">{historyRow.amount}</TableCell>
      <TableCell align="right">
        {Math.round(historyRow.amount * row.price * 100) / 100}
      </TableCell>
    </TableRow>
  ))}
</TableBody>
</Table>*/



/*{<TableCell align="left" ><Button  variant="contained" onClick={()=>
  makeChange()} endIcon={<SendIcon />}>
    Mark as done</Button></TableCell> }*/