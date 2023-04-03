import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({ // Määritellään uusi api-muuttuja, joka käyttää createApi-funktiota
  reducerPath: 'api', // määritellään missä kohdassa storea reduceri tälle apille sijoitetaan
  baseQuery: fetchBaseQuery(), //  määritellään oletusmuotoilu käytettäväksi jokaisessa queryssa
  endpoints: (builder) => ({


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


    getProfiles: builder.query({
      query: () => '/profiles',
    }),
    getUser: builder.query({
      query: () => '/login',
    }),
  }),
});

export const { 
useGetTasksQuery, useCreateTaskMutation,

useGetProfilesQuery, useGetUserQuery } // tähän profiilien exportit
= apiSlice;


// käsittelee task ja profile taulukoita
// tänne loput CRUDIT


// api endpointista haetaan tiedot www....../profiles/mikkoterho yms.
// Slice tiedostossa määritellään RTQ
// API-hooki useGetProfileQuery/, jonka avulla voidaa kysyä tietokannasta profiilin tai taski
