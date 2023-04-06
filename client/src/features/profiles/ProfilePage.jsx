import { TaskContainer } from "../tasks/taskContainer";
import { ProfileOverview } from "./ProfileOverview";
import { ProfileReviewContainer } from "./ProfileReviewContainer";
import { useSelector } from "react-redux";

export function ProfilePage() {
  let user = useSelector(state => state.userReducer.user) || {};

  return (
    <div>
      <ProfileOverview />
      <div className="row">
        <div className="col-6">
          <TaskContainer profileId={user.id} />
        </div>
        <div className="col-6">
          <ProfileReviewContainer />
        </div>
      </div>

    </div>
  );
}

