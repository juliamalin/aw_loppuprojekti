import { useGetTasksAndCreatorQuery } from "../../main/apiSlice";
import { TimeAgo } from './timeAgo'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import FormDialog from "./createTask";




let TaskExcerpt = ({task}) => {

    return (
        <article className="task-excerpt">
        <h3>{task.title}</h3>
        <div>
        by {task.profile.username}
        <TimeAgo timestamp={task.created}/>
        <p>{task.status}</p>
        <DraggableDialog task={task}/>
        </div>
        </article>
    )
}


export const TaskContainer = () =>{
    const { 
        data:tasks=[], 
        isLoading 
    } = useGetTasksAndCreatorQuery();


    let content = tasks.map(task=> <TaskExcerpt key={task.id} task={task} />)

    return (
        <section className="task-list">
            {content}
            
            <FormDialog/>
        </section>
    )

}

//        <p className="task-content">{task.content.substring(0,100)}</p>
//        <TimeAgo timestamp={date}/>
//     let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(task.created)

