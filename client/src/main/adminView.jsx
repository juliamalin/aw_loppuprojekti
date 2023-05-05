import React from "react"
import { useGetProfilesQuery, useGetReviewsQuery, useGetSimpleTasksQuery, useDeleteTaskMutation, useDeleteReviewMutation } from "./apiSlice"





export const AdminView = () => {


    const { data: tasks, isLoading: isLoadingTasks } = useGetSimpleTasksQuery()
    const { data: reviews, isLoading: isLoadingReviews } = useGetReviewsQuery();
    const { data: profiles, isLoading: isLoadingProfiles } = useGetProfilesQuery();

    const [deleteTask] = useDeleteTaskMutation()
    const [deleteReview] = useDeleteReviewMutation()

    let profileKeys
    let reviewKeys
    let taskKeys
    if (!isLoadingProfiles) profileKeys = Object.keys(profiles[1])
    if (!isLoadingTasks) taskKeys = Object.keys(tasks[1])
    if (!isLoadingReviews) reviewKeys = Object.keys(reviews[1])





    if (isLoadingProfiles || isLoadingReviews || isLoadingTasks) return <p>Loading...</p>

    return (
        <div>
            <h2>Admin View</h2>
            <div>

                <div>
                    <h3>Profiles</h3>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                {profileKeys.map(key => <th key={key}>{key}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {profiles.map(profile =>
                                <tr>
                                    {profileKeys.map(key => <td>{profile[key]}</td>)}
                                </tr>)}
                        </tbody>
                    </table>
                </div>

                <div>
                    <h3>Tasks</h3>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                {taskKeys.map(key => <th key={key}>{key}</th>)}
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map(task => <tr>
                                {taskKeys.map(key => <td>{task[key]}</td>)}
                                <td><button onClick={() => deleteTask(task.id).unwrap().then(response => {
                                    console.log('deleted', response)
                                })}>Delete</button></td>
                            </tr>)}

                        </tbody>
                    </table>
                </div>

                <div>

                    <h3>Reviews</h3>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                {reviewKeys.map(key => <th key={key}>{key}</th>)}
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map(review =>
                                <tr>
                                    {reviewKeys.map(key => <td>{review[key]}</td>)}
                                    <td><button onClick={() => deleteReview(review.id).unwrap().then(response => {
                                        console.log('deleted', response)
                                    })}>Delete</button></td>
                                </tr>)}
                        </tbody>
                    </table>
                </div>





            </div>


        </div>
    )
}