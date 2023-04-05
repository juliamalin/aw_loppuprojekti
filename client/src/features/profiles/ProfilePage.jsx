import { useGetProfileByIdQuery } from "../../main/apiSlice";
import { TaskContainer } from "../tasks/taskContainer";
import { ProfileOverview } from "./ProfileOverview";
import { ProfileReviewContainer } from "./ProfileReviewContainer";


export function ProfilePage() {
  const { data: profile, isLoading } = useGetProfileByIdQuery(1); //Using profile id 1 for testing


  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProfileOverview />
      <div className="row">
        <div className="col-6">
          <TaskContainer />
        </div>
        <div className="col-6">
          <ProfileReviewContainer />
        </div>
      </div>

    </div>
  );
}

