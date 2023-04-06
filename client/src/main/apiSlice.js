import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({ // Määritellään uusi api-muuttuja, joka käyttää createApi-funktiota
  reducerPath: 'api', // määritellään missä kohdassa storea reduceri tälle apille sijoitetaan
  baseQuery: fetchBaseQuery(), //  määritellään oletusmuotoilu käytettäväksi jokaisessa queryssa
  tagTypes: ['Task', 'Profile'],
  endpoints: (builder) => ({

    // TASKIT
    getTasks: builder.query({ // määritellään buildereille molemmat endpointit
      query: () => '/tasks',
      providesTags: (result = [], error, arg) => [
        'Task',
        ...result.map(({ id }) => ({ type: 'Task', id }))
      ],
    }),
    getTaskById: builder.query({
      query: (taskId) => `/tasks/${taskId}`,
      providesTags: (result, error, arg) => [{ type: 'Task', id:arg }],
    }),
    createTask: builder.mutation({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: task
      }),
      invalidatesTags: ['Task'] //Kun task lisätään -> päivitetään komponentit jotka näyttävät kaikki taskit
    }),
    updateTask: builder.mutation({
      query: (task) => ({
        url: `/tasks/${task.id}`,
        method: 'PUT',
        body: task
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Task', id: arg.id }], // kun yksittäistä taskia muutetaan -> päivitetään vain se id:n perusteella (eikä kaikkia taskeja)
    }),
    deleteTask: builder.mutation({
      query: (taskId) => ({
        url: `/tasks/${taskId}`,
        method: "DELETE"
      }),
      invalidatesTags: ['Task']
    }),
    getTasksAndCreator: builder.query({
      query: () => '/tasks/creators',
    }),

    // PROFIILIT
    getProfiles: builder.query({
      query: () => '/profiles',
      providesTags: (result = [], error, arg) => [
        'Profile',
        ...result.map(({ id }) => ({ type: 'Profile', id }))
      ],
    }),
    createProfile: builder.mutation({
      query: (profile) => ({
        url: '/profiles',
        method: 'POST',
        body: profile
      }),
      invalidatesTags: ['Profile']
    }),
    updateProfile: builder.mutation({
      query: (profile) => ({
        url: `/profile/${profile.id}`,
        method: 'PUT',
        body: profile
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Profile', id: arg.id }]
    }),
    deleteProfile: builder.mutation({
      query: (profileId) => ({
        url: `/profiles/${profileId}`,
        method: "DELETE"
      }),
      invalidatesTags: ['Profile']
    }),
    getProfileById: builder.query({
      query: (profileId) => `/profiles/${profileId}`,
      providesTags: (result, error, arg) => [{ type: 'Task', id: arg }],
    }),
    getProfileWithTasksById: builder.query({
      query: (profileId) => `/creators/owntasks/${profileId}`,
      providesTags: (result, error, arg) => [{ type: 'Task', id: arg }],
    }),
    getPerformerWithTasksById: builder.query({
      query: (profileId) => `/performers/owntasks/${profileId}`,
      providesTags: (result, error, arg) => [{ type: 'Task', id: arg }],
    }),


    // USER/LOGIN
    getUser: builder.query({
      query: () => '/login',
    }),
    createUser: builder.mutation({
      query: (user) => ({
        url: '/login',
        method: 'POST',
        body: user
      })
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: '/login',
        method: 'PUT',
        body: user
      })
    }),
    logoutUser: builder.mutation({
      query: () => ({
        url: '/login',
        method: 'DELETE'
      })
    }),


    // REVIEW
    getReviews: builder.query ({
      query: () => '/review',
      providesTags: (result = [], error, arg) => [
        'Review',
        ...result.map(({ id }) => ({ type: 'Review', id }))
      ],
    })
  }),
})


export const {
  //Taskit
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksAndCreatorQuery,
  
  //Profiilit
  useGetProfilesQuery,
  useCreateProfileMutation,
  useUpdateProfileMutation,
  useDeleteProfileMutation,

  useGetProfileByIdQuery,
  useGetProfileWithTasksByIdQuery, // tähän profiilien exportit
  useGetPerformerWithTasksByIdQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation, //tässä login

  //Reviewit
  useGetReviewsQuery
}
  = apiSlice;


// käsittelee task ja profile taulukoita
// tänne loput CRUDIT


// api endpointista haetaan tiedot www....../profiles/mikkoterho yms.
// Slice tiedostossa määritellään RTQ
// API-hooki useGetProfileQuery/, jonka avulla voidaa kysyä tietokannasta profiilin tai taski
