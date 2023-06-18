import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/User/UserSlice";
import PostReducer from "../features/Post/PostSlice";
import LikeReducer from "../features/Like/LikeSlice";

export const store = configureStore({
    reducer: {
        User: UserReducer,
        Post: PostReducer,
        Like: LikeReducer
    }
});