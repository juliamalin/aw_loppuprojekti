import { configureStore } from '@reduxjs/toolkit';
import { api } from './apiSlice';

export const store = configureStore({ // Määritellään uusi store-muuttuja, joka käyttää configureStore-funktiota Redux Toolkitista
  reducer: {
    [api.reducerPath]: api.reducer, // määritellään, että apin reducer sijoitetaan storen api.reducerPath-kohtaan
  },
  
  // määritellään middleware-ketju, joka käyttää getDefaultMiddleware-funktiota 
  // Redux Toolkitista ja liittää siihen API:n middleware-kohdan

  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(api.middleware),
});

// Redux Toolkit Query -paketin api-muuttuja sijoitetaan storeen 
// ja liitetään siihen middleware-ketju, joka mahdollistaa API-kyselyjen tekemisen
