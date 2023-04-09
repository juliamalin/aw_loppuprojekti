import { configureStore, createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';
import { mapSlice } from './mapSlice';

const initialState = {user: {}, notifications: []};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {state.user = action.payload},
    addNotification: (state, action) => {state.notifications.push(action.payload)},
    
  }
})



export const { setUser, addNotification } = userSlice.actions

export const store = configureStore({ // Määritellään uusi store-muuttuja, joka käyttää configureStore-funktiota Redux Toolkitista
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // määritellään, että apin reducer sijoitetaan storen api.reducerPath-kohtaan
    userReducer: userSlice.reducer,
    mapReducer: mapSlice.reducer,
  },

  // määritellään middleware-ketju, joka käyttää getDefaultMiddleware-funktiota 
  // Redux Toolkitista ja liittää siihen API:n middleware-kohdan

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

// Redux Toolkit Query -paketin api-muuttuja sijoitetaan storeen
// ja liitetään siihen middleware-ketju, joka mahdollistaa API-kyselyjen tekemisen
