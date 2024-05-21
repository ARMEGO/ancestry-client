import { createSlice } from "@reduxjs/toolkit";

const initialState = { username: '', token: null };

export const authUserSlice = createSlice({
    name: "authUser",
    initialState,
    reducers: {
        /**
         * Add user
         * @param state
         * @param action
         */
        setAuthUser: (_state, action) => { return { ...action.payload } },
        /**
         * Log user out
         * @param state
         */
        signOut: (state) => {
            sessionStorage.clear();
            state.username = '';
            state.token = null;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setAuthUser, signOut } = authUserSlice.actions;

export default authUserSlice.reducer;
