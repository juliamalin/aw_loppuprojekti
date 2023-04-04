import { useGetProfileByIdQuery, useGetProfileWithTasksByIdQuery } from "../../main/apiSlice";



export function Profile() {
  const { data: profile, isLoading } = useGetProfileByIdQuery(1);

  const { data: profileTask, isLoading: isLoading2 } = useGetProfileWithTasksByIdQuery(1);



  if (isLoading || isLoading2) {
    return <div>Loading...</div>;
  }
  console.log(profile)
  console.log(profileTask)

  {/*}
  const taskList = profileTask.tasks.map(task => ({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    location: task.location,
    payment: task.payment

  })); */}

  return (
    <div>
      <img alt="Profiilikuva" src="../images/EcceHomo.png" />
      <h2>{profile.username}</h2>
      

    </div>
  );
}

