import { createSlice } from '@reduxjs/toolkit';

const initialState = { bounds: { minLat: null, maxLat: null, minLng: null, maxLng: null } };

export const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setBounds: (state, action) => { state.bounds = action.payload },
    }
})

export const { setBounds } = mapSlice.actions
