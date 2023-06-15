import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/User/UserSlice";

export const store = configureStore({
    reducer: {
        User: UserReducer,
    }
});