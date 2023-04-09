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


export function Row({task},{user}) {

    const [open, setOpen] = React.useState(false);
    console.log(user)
  
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
          <TableCell class="lowercell" align="left">{task.creator.username}</TableCell>
          <TableCell class="lowercell" align="left">{task.status.charAt(0).toUpperCase() + task.status.slice(1)}</TableCell>
          <TableCell class="lowercell" align="left">{task.location}</TableCell>
          <TableCell class="lowercell" align="left" >{task.payment}</TableCell>
          <TableCell class="lowercell" align="left" style={{ borderBottom: '1px solid rgba(224, 224, 224, 1)'}} >
            <AlertDialogSlide task={task} user={user} ></AlertDialogSlide></TableCell> 

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
  
