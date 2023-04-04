import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({ // Määritellään uusi api-muuttuja, joka käyttää createApi-funktiota
  reducerPath: 'api', // määritellään missä kohdassa storea reduceri tälle apille sijoitetaan
  baseQuery: fetchBaseQuery(), //  määritellään oletusmuotoilu käytettäväksi jokaisessa queryssa
  endpoints: (builder) => ({

// TASKIT
    getTasks: builder.query({ // määritellään buildereille molemmat endpointit
      query: () => '/tasks',
    }),
    createTask: builder.mutation({
      query: (task) => ({
        url: '/tasks',
        method: 'POST',
        body: task
      })
    }),
    getTasksAndCreator: builder.query({
      query: () => '/tasks/creators',
    }),


 // PROFIILIT
    getProfiles: builder.query({
      query: () => '/profiles',
    }),
    getProfileById: builder.query({
      query: () => '/profiles/1',
    }),
    getProfileWithTasksById: builder.query({
      query: () => '/creators/owntasks/1'
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
    })
  }),
});

export const { 
useGetTasksQuery, useCreateTaskMutation, useGetTasksAndCreatorQuery,

useGetProfilesQuery, useGetProfileByIdQuery, useGetProfileWithTasksByIdQuery, // tähän profiilien exportit
useGetUserQuery, useCreateUserMutation, useLoginUserMutation, useLogoutUserMutation //tässä login
} 
= apiSlice;


// käsittelee task ja profile taulukoita
// tänne loput CRUDIT


// api endpointista haetaan tiedot www....../profiles/mikkoterho yms.
// Slice tiedostossa määritellään RTQ
// API-hooki useGetProfileQuery/, jonka avulla voidaa kysyä tietokannasta profiilin tai taski
