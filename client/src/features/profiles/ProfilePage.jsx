import { ProfileOverview } from "./ProfileOverview";
import { ProfileReviewContainer } from "./ProfileReviewContainer";
import { useSelector } from "react-redux";
import { ProfileStatistics } from "./ProfileStatistics";

export function ProfilePage() {
  let user = useSelector(state => state.userReducer.user) || {};

  return (
    <div>
      <ProfileOverview />
      <div className="row">
        <div className="col-6">
          <ProfileStatistics />
        </div>
        <div className="col-6">
          <ProfileReviewContainer />
        </div>
      </div>

    </div>
  );
}

