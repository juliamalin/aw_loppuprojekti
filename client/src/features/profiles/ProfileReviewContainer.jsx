import React from "react";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useGetReviewsQuery } from "../../main/apiSlice";
import ReviewDialog from "../reviews/reviewCont";
import { useSelector } from "react-redux";
import '../../App.css';


const ReviewExcerpt = ({ review }) => {
    const user = useSelector(state => state.userReducer.user) || {};

    return (
        <div >
            <div key={user.id} className="reviewi" >
                <Box
                    sx={{
                        '& > legend': { mt: 2 },
                    }}
                >
                    <Rating name="read-only" value={review.value} readOnly />
                </Box>
                <p>{review.comment}</p>
                <p>{review.title}</p>
            </div>
        </div>
    );
}

export const ProfileReviewContainer = () => {
    const { data: reviews = [], isLoading } = useGetReviewsQuery();
    const user = useSelector(state => state.userReducer.user) || {};
     
    const filteredReviews = reviews.filter(review =>  review.targetuser_id === user.id); // vain ne reviewit näytetään joissa user-id vastaa performer tai targetuser id:tä

    let content = filteredReviews.map(review => <ReviewExcerpt key={user.id} review={review} />);

    return (
        <div>
            <h2>Profile Reviews</h2>
            <div className="reviewList">
                {content}
            </div>
        </div>
    )
}
