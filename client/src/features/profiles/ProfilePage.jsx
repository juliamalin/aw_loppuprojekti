import { useCreateTaskMutation, useGetProfilesQuery, useGetTasksQuery } from "../../main/apiSlice";


export function Profile() {
  const { data:profiles, isLoading } = useGetProfilesQuery();

  const [createTask] = useCreateTaskMutation();

  console.log(profiles)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const newTask = {
    title: "imurointi", 
    description: "imuroi mun koti", 
    status: "available", 
    location: "Mannerheimintie 3", 
    latitude: 30, 
    longitude: 30, 
    creatorId: 1
  }

  return (
    <div>
      <h2>{profiles.name}</h2>
      
      <button onClick={() => createTask(newTask).unwrap().then(response => console.log(response))}>POST</button>
    
      <img src={profiles.image} alt={profiles.name} />
    </div>
  );
}

