
let TaskExcerpt = ({task}) => {
    return (
        <article className="task-excerpt">
        <h3>{task.title}</h3>
        <div>
        {task.id}
        {task.time}
        </div>
        <p className="button muted-button">
        View Task
      </p>
        </article>
    )
}
/*

const [createTask] = useCreateTaskMutation();

const newTask = {
    title: "imurointi", 
    description: "imuroi mun koti", 
    status: "available", 
    location: "Mannerheimintie 3", 
    latitude: 30, 
    longitude: 30, 
    creatorId: 1
  }

  <button onClick={() => createTask(newTask).unwrap().then(response => console.log(response))}>POST</button>
  */

export const TaskContainer = () =>{
    const tasks=[
            { id: '1', time: '10:42',title: 'First Task!', content: 'Pese ikkunat' },
            { id: '2', time: '10:43', title: 'Second Task', content: 'Vie koirat ulos' }
          ]
    

    let content = tasks.map(task=> <TaskExcerpt key={task.id} task={task}/>)

    return (
        <section className="tasks-list">
            {content}
        </section>
    )

}

//        <p className="task-content">{task.content.substring(0,100)}</p>
