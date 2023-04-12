import React from "react";
import { useSelector } from "react-redux";
import { useGetCreatedTasksQuery, useGetTasksDoneQuery, useGetTasksInAreaQuery, useGetTasksQuery } from "../../main/apiSlice";
import { TimeAgo } from './timeAgo'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormDialog from "./createTask";
import DraggableDialog from "./viewTask";
import '../../App.css';



const TaskExcerpt = ({ task }) => {
    const [open, setOpen] = React.useState(false)


    return (
        <article className="task-excerpt" onClick={() => { if (!open) setOpen(true) }}>
            <p className="task-info">{task.title}</p>
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

export const TaskContainer = ({ ws }) => {

    const [durationRange, setDurationRange] = React.useState('all')
    const [sortBy, setSortBy] = React.useState('all')
    const [searchText, setSearchText] = React.useState('')
    const [searchOption, setSearchOption] = React.useState('task')

    const bounds = useSelector(state => state.mapReducer.bounds)
    const {
        data: tasks = [],
        isLoading
    } = useGetTasksInAreaQuery(bounds)


    //Filter tasks
    let filteredTasks = [...tasks]

    //filter based on search results
    if (searchOption === 'task') filteredTasks = filteredTasks.filter(task => {
        return (task.description.includes(searchText) || task.title.includes(searchText))
    })

    if (searchOption === 'username') filteredTasks = filteredTasks.filter(task => {
        return task.creator.username.includes(searchText)
    })



    //filter based on duration
    if (durationRange === 'short') filteredTasks = filteredTasks.filter(task => {
        return task.durationinminutes <= 10
    })
    if (durationRange === 'medium') filteredTasks = filteredTasks.filter(task => {
        return (task.durationinminutes > 10 && task.durationinminutes <= 30)
    })
    if (durationRange === 'long') filteredTasks = filteredTasks.filter(task => {
        return task.durationinminutes > 30
    })



    //Sort tasks
    const sortedTasks = [...filteredTasks]
    if (sortBy === 'time') sortedTasks.sort((a, b) => b.created.localeCompare(a.created))
    // if (sortBy === 'distance') //Implement later
    if (sortBy === 'price') sortedTasks.sort((a, b) => b.payment > a.payment ? 1 : -1)

    let content = sortedTasks.map(task => <TaskExcerpt key={task.id} task={task} ws={ws} />)

    return (

        <section className="task-container">
            <div className="row d-flex ">
                <div className="col text-end">
                    <select className="form-select" aria-label="Default select example" onChange={ev => setSearchOption(ev.target.value)} >
                        <option value="task">Task</option>
                        <option value="username">Username</option>
                    </select>
                </div>
                <div className="col text-start">
                    <input placeholder="Search" onChange={ev => setSearchText(ev.target.value)}></input>
                </div>


                <div className="col text-end">
                    <p>Duration</p>
                </div>
                <div className="col text-start">
                    <select className="form-select" aria-label="Default select example" onChange={ev => setDurationRange(ev.target.value)}>
                        <option value="all">All</option>
                        <option value="short">0-10 min</option>
                        <option value="medium">10-30 min</option>
                        <option value="long">+30 min</option>
                    </select>
                </div>
                <div className="col text-end">
                    <p>Sort by</p>
                </div>
                <div className="col text-start">
                    <select className="form-select" aria-label="Default select example" onChange={ev => setSortBy(ev.target.value)}>
                        <option value="all">All</option>
                        <option value="time">Most Recent</option>
                        <option value="price">Price</option>
                        <option value="distance">Distance</option>
                    </select>
                </div>


            </div>
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

