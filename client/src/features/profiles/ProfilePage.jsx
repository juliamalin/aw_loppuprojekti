import { useGetProfileByIdQuery, useGetProfileWithTasksByIdQuery } from "../../main/apiSlice";



export function Profile() {
  const { data: profile, isLoading } = useGetProfileByIdQuery(1);

  const { data: profileTask, isLoading: isLoading2 } = useGetProfileWithTasksByIdQuery(1);



  if (isLoading || isLoading2) {
    return <div>Loading...</div>;
  }
  console.log(profile)
  console.log(profileTask)

<<<<<<< HEAD
  // const taskList = profileTask.tasks.map(task => ({
  //   id: task.id,
  //   title: task.title,
  //   description: task.description,
  //   status: task.status,
  //   location: task.location,
  //   payment: task.payment

  // }));
=======
  {/*}
  const taskList = profileTask.tasks.map(task => ({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    location: task.location,
    payment: task.payment

  })); */}
>>>>>>> e94381087c826eda0ddd5451215f99c1d44eafc7

  return (
    <div>
      <img alt="Profiilikuva" src="../images/EcceHomo.png" />
<<<<<<< HEAD
      {/* <h2>{profileTask.username}</h2> */}

=======
      <h2>{profile.username}</h2>
      
>>>>>>> e94381087c826eda0ddd5451215f99c1d44eafc7

    </div>
  );
}

