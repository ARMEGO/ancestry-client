import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

// redux slice to store error
export const errorsSlice = createSlice({
    name: "errors",
    initialState,
    reducers: {
        /**
         * Add errors
         * @param state
         * @param action
         * @returns errors
         */
        addErrors: (state, action) => {
            let setObj = new Set([...state, action.payload].map(JSON.stringify));
            let output = Array.from(setObj).map(JSON.parse);
            return output
        }
    }
});

// Action creators are generated for each case reducer function
export const { addErrors } = errorsSlice.actions;

export default errorsSlice.reducer;
