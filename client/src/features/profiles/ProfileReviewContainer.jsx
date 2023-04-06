import React from "react";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useGetReviewsQuery } from "../../main/apiSlice";


const ReviewExcerpt = ({ review }) => {

    return (
        <div>
            <div key={review.id}>
                <Box
                    sx={{
                        '& > legend': { mt: 2 },
                    }}
                >
                    <Rating name="read-only" value={review.value} readOnly />
                </Box>
                <p>{review.value}</p>
                <p>{review.comment}</p>
            </div>
        </div>
    );
}

export const ProfileReviewContainer = () => {
    const { data: reviews = [], isLoading } = useGetReviewsQuery();

    let content = reviews.map(review => <ReviewExcerpt key={review.id} review={review} />)

    return (
        <div>
            <h2>Profile Reviews</h2>
            <div>
                {content}
                
            </div>
        </div>
    )
}