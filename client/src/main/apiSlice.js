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


 // PROFIILIT
    getProfiles: builder.query({
      query: () => '/profiles',
    }),
    getProfileById: builder.query({
      query: () => '/profiles/1',
    }),
    getProfileWithTasksById: builder.query({
      query: () => '/creators/owntasks/1'
    })
  }),
});

export const { 
useGetTasksQuery, useCreateTaskMutation,

useGetProfilesQuery, useGetProfileByIdQuery, useGetProfileWithTasksByIdQuery } // tähän profiilien exportit
= apiSlice;


// käsittelee task ja profile taulukoita
// tänne loput CRUDIT


// api endpointista haetaan tiedot www....../profiles/mikkoterho yms.
// Slice tiedostossa määritellään RTQ
// API-hooki useGetProfileQuery/, jonka avulla voidaa kysyä tietokannasta profiilin tai taski
