import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface NavigationState {
  origin: {
    location: {
      lat: number;
      lng: number;
    };
    description: string;
  };
  destination: null;
  travelTimeInformation: null;
}

//1) Defining the initial state using that type
const initialState: NavigationState = {
  origin: {
    location: {
      lat: 0,
      lng: 0,
    },
    description: '',
  },
  destination: null,
  travelTimeInformation: null,
};

//2) Creating slice and functions
export const navSlice = createSlice({
  name: 'nav',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTimeInformation } =
  navSlice.actions;

//Selectors
export const selectOrigin = (state: RootState) => state.nav.origin;
export const selectDestination = (state: RootState) => state.nav.destination;
export const selectTravelTimeInformation = (state: RootState) =>
  state.nav.travelTimeInformation;

export default navSlice.reducer;
