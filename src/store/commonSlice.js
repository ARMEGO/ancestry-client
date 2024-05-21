import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cities: [],
    paymentOptions: [],
};

// redux slice to store cities
export const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        /**
         * Add cities
         * @param state
         * @param action
         * @returns cities
         */
        addCities: (state, action) => { state.cities = action.payload },
        /**
         * Add paymentOptions
         * @param state
         * @param action
         * @returns paymentOptions
         */
        addPaymentOptions: (state, action) => { state.paymentOptions = action.payload },
    },
});

// Action creators are generated for each case reducer function
export const { addCities, addPaymentOptions } = commonSlice.actions;

export default commonSlice.reducer;
