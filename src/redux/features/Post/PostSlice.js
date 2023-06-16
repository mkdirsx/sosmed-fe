import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: []
};

export const PostSlice = createSlice({
    name: 'Post',
    initialState,
    reducers: {
        setPosts: (initialState, action) => {
            initialState.posts = action.payload;
        }
    }
});

export const { setPosts } = PostSlice.actions;
export default PostSlice.reducer;