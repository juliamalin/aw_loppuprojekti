import { useGetReviewsQuery } from "../../main/apiSlice";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

export default function ProfileReviewContainer() {
    const { data: reviews, isLoading } = useGetReviewsQuery();

    if (isLoading) {
        return <div>Loading...</div>;
    }
 // nyt kaikki reviewsit täällä testausta varten
 // id:n mukaan pitäisi saada
    return (
        <div>
            {reviews.map(review => (
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
            ))}
        </div>

    );
}
