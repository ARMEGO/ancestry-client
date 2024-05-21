import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

// redux slice to store users
export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        /**
         * Add users
         * @param _state
         * @param action
         * @returns users
         */
        addUsers: (_state, action) => action.payload,
        /**
         * Update existing user
         * @param state
         * @param action
         * @returns user
         */
        updateUser: (state, action) =>
            state.map((user) => {
                if (user.id !== action.payload.id) {
                    // This isn't the item we care about - keep it as-is
                    return user;
                }

                // Otherwise, this is the one we want - return an updated value
                return {
                    ...user,
                    ...action.payload,
                };
            }),
    },
});

// Action creators are generated for each case reducer function
export const { addUsers, updateUser } =
    usersSlice.actions;

export default usersSlice.reducer;
