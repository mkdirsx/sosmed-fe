import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/User/UserSlice";
import PostReducer from "../features/Post/PostSlice";

export const store = configureStore({
    reducer: {
        User: UserReducer,
        Post: PostReducer
    }
});