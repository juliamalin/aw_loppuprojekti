import { Rating } from "@mui/material"
import { useGetProfileByIdQuery } from "../../main/apiSlice"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"


export const ProfileOverview = () => {
    const { data: profile } = useGetProfileByIdQuery(1)
    let user = useSelector(state => state.userReducer.user) || {};
    console.log(profile)
    return (
        <div className="row bg-image" style={{ backgroundImage: "url('https://i.pinimg.com/originals/70/0e/6a/700e6a06e2dc3c5174178ba09a8b094d.jpg')" }}>

            <div className="col-3 profile-image-container">
                <img src="EcceHomo.png" alt="Profile image"></img>
            </div>
            <div className="col-9">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="mx-auto">
                        <h2 className="text-center">{user.username}</h2>
                        <Rating name="size-large" defaultValue={4} size="large" readOnly />
                    </div>
                    <Link className="button muted-button" to={`/profile/edit/${profile.id}`}>Edit Profile</Link>
                </div>




            </div>
        </div>
        


    )
}