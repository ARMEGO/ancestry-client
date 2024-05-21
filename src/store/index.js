import { configureStore } from "@reduxjs/toolkit";
import authUserSlice from "./authUserSlice";
import usersSlice from "./usersSlice";
import commonSlice from "./commonSlice";
import errorsSlice from "./errorsSlice";

export const store = configureStore({
    reducer: {
        common: commonSlice,
        authUser: authUserSlice,
        users: usersSlice,
        errors: errorsSlice,
    },
});
