import { TaskContainer } from "./taskContainer";
import {  useGetPerformerWithTasksByIdQuery} from "../../main/apiSlice";
import { TimeAgo } from './timeAgo'
import DraggableDialog from "./viewTask";
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';



let TaskExcerpt = ({ task }) => {

    return (
        <article className="task-excerpt">
            <h3>{task.title}</h3>
            <div className="task-info">
                by {task.profile.username}
                <TimeAgo timestamp={task.created} />
                <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>

                {/*<LinearProgress color="success">*/}
                </Stack>

               <DraggableDialog task={task} className="viewtask" />
            </div>
        </article>
    )
}

export const MyTasks = ({profileId=1}) => {
    const {
        data: {tasks = []}={}, //This line of code is using destructuring assignment to extract the tasks array from the data object returned by the useGetPerformerWithTasksByIdQuery hook
        isLoading
    } =  useGetPerformerWithTasksByIdQuery(profileId);
    

    //console.log(tasks) 
    let content = tasks.map((task)=> <TaskExcerpt key={task.id} task={task} />)
    //console.log(content) 
    
    return (
        <section>
            <div className="task-list">
            {content}
            </div>
            <div className="plus-button">
            </div>
        </section>
       
    )

}

