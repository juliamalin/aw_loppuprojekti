import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const api = createApi({ // Määritellään uusi api-muuttuja, joka käyttää createApi-funktiota
  reducerPath: 'api', // määritellään missä kohdassa storea reduceri tälle apille sijoitetaan
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.LOL.com' }), //  määritellään oletusmuotoilu käytettäväksi jokaisessa queryssa
  endpoints: (builder) => ({
    getTasks: builder.query({ // määritellään buildereille molemmat endpointit
      query: () => '/books/tasks',
    }),
    getProfiles: builder.query({
      query: () => '/books/profiles',
    }),
  }),
});

export const { useGetTasksQuery, useGetProfilesQuery } = api;


// käsittelee task ja profile taulukoita
// tänne loput CRUDIT


// api endpointista haetaan tiedot www....../profiles/mikkoterho yms.
// Slice tiedostossa määritellään RTQ
// API-hooki useGetProfileQuery/, jonka avulla voidaa kysyä tietokannasta profiilin tai taski
