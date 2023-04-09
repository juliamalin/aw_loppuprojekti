import { Rating } from "@mui/material"
import { useGetProfileByIdQuery } from "../../main/apiSlice"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useGetReviewsQuery } from "../../main/apiSlice"
import '../../App.css';


export const ProfileOverview = () => {
    let user = useSelector(state => state.userReducer.user) || {};
    const { data: profile, isLoading } = useGetProfileByIdQuery(user.id)
    const { data: reviews = [] } = useGetReviewsQuery();

    console.log(profile)
    if (isLoading) {
        return <div>Loading...</div>
    }

    const filteredReviews = reviews.filter(review => review.performer_id === user.id || review.targetuser_id === user.id);
    const numReviews = filteredReviews.length;
    const totalRating = filteredReviews.reduce((acc, review) => acc + review.value, 0) / numReviews;
    const labels = {
        1: 'Rotten Rodent',
        2: 'Hasty Hopper',
        3: 'Respectable Rabbit',
        4: 'Blessed Bunny',
        5: 'Heroic Hare',
      };

    console.log('totalrating:' + totalRating)

    return (
        <div className="row bg-image" style={{ backgroundImage: "url('https://i.pinimg.com/originals/70/0e/6a/700e6a06e2dc3c5174178ba09a8b094d.jpg')" }}>

            <div className="col-3 profile-image-container">
                <img src="EcceHomo.png" alt="Profile image"></img>
            </div>
            <div className="col-9">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="mx-auto">
                        <h2 className="text-center">{user.username}</h2>
                        <Rating name="size-large" defaultValue={totalRating} size="large" readOnly />
                        <h4 className="nickName">"{labels[Math.round(totalRating)]}"</h4>
                    </div>
                    <Link className="button muted-button" to={`/profile/edit`}>Edit Profile</Link>
                </div>




            </div>
        </div>



    )
}