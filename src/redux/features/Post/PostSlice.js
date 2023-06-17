import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import URLAPI from "../../../support/constants/URLAPI";

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

export const getPosts = () => async(dispatch) => {
    try {
        const response = await axios.get(`${URLAPI}/posts`);

        dispatch(setPosts(response.data.data));
        return Promise.resolve(response.data);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const { setPosts } = PostSlice.actions;
export default PostSlice.reducer;