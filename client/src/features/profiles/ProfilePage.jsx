import { useParams } from "react-router-dom";
import { TaskContainer } from "../tasks/taskContainer";
import { ProfileOverview } from "./ProfileOverview";
import { ProfileReviewContainer } from "./ProfileReviewContainer";


export function ProfilePage() {
  const { profileId } = useParams()

  return (
    <div>
      <ProfileOverview />
      <div className="row">
        <div className="col-6">
          <TaskContainer profileId={profileId} />
        </div>
        <div className="col-6">
          <ProfileReviewContainer />
        </div>
      </div>

    </div>
  );
}

