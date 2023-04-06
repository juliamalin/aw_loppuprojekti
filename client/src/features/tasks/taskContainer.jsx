import React from "react";
import { useSelector } from "react-redux";
import { useGetCreatedTasksQuery, useGetTasksDoneQuery, useGetTasksQuery } from "../../main/apiSlice";
import { TimeAgo } from './timeAgo'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import FormDialog from "./createTask";
import DraggableDialog from "./viewTask";
import '../../App.css';



const TaskExcerpt = ({ task }) => {
    const [open, setOpen] = React.useState(false)


    return (
        <article className="task-excerpt" onClick={() => setOpen(true)}>
            <p>{task.title}</p>
            <div className="task-info">
                by {task.creator.username}
                <TimeAgo timestamp={task.created} />
                <div className="dialog-container">
                    <p>{task.status}</p>
                    <DraggableDialog task={task} open={open} setOpen={setOpen} />
                </div>
            </div>
        </article>
    )
}



export const TaskContainer = ({ profileId, area }) => {



    const {
        data: tasks = [],
        isLoading
    } = useGetTasksQuery()


    let content = tasks.map(task => <TaskExcerpt key={task.id} task={task} />)

    return (

        <section>
            <div className="task-list">
                {content}
            </div>
            <div className="plus-button">
                <FormDialog />
            </div>
        </section>

    )

}

//        <p className="task-content">{task.content.substring(0,100)}</p>
//        <TimeAgo timestamp={date}/>
//     let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(task.created)

