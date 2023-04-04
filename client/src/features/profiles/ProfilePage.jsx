import { useGetProfileByIdQuery,  useGetProfileWithTasksByIdQuery } from "../../main/apiSlice";



export function Profile() {
  const { data:profile, isLoading } = useGetProfileByIdQuery();

  const { data:profileTask } = useGetProfileWithTasksByIdQuery();

  console.log(profileTask)
  console.log(profile)

  if (isLoading) {
    return <div>Loading...</div>;
  }

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

