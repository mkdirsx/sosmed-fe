import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import URLAPI from "../../../support/constants/URLAPI";

const initialState = {
    posts: [],
    total: 0
};

export const PostSlice = createSlice({
    name: 'Post',
    initialState,
    reducers: {
        setPosts: (initialState, action) => {
            initialState.posts = action.payload;
        },
        setTotal: (initialState, action) => {
            initialState.total = action.payload;
        }
    }
});

export const getPosts = (data) => async(dispatch) => {
    try {
        const response = await axios.get(`${URLAPI}/posts?page=${data?.page || 1}`);

        dispatch(setPosts(response.data.data.rows));
        dispatch(setTotal(response.data.data.count));
        return Promise.resolve(response.data);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const getUserPost = (data) => async(dispatch) => {
    try {
        const response = await axios.get(`${URLAPI}/posts/${data.id}?page=${data?.page || 1}`);

        dispatch(setPosts(response.data.data.rows));
        dispatch(setTotal(response.data.data.count));
        return Promise.resolve(response.data);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const createPost = (data) => async(dispatch) => {
    try {
        const response = await axios.post(`${URLAPI}/posts`, {
           caption: data.caption,
           image: data.image,
           userId: data.userId
        }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        setTimeout(() => {
            dispatch(getPosts()).then(
                () => {

                },
                (error) => {
                    return Promise.reject(error);
                }
            )
        })

        return Promise.resolve(response.data);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const updatePost = (data) => async(dispatch) => {
    try {
        const response = await axios.patch(`${URLAPI}/posts/${data.id}`, {
            newMessage: data.newMessage
        });

        return Promise.resolve(response.data);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const deletePost = (data) => async(dispatch) => {
    try {
        const response = await axios.delete(`${URLAPI}/posts/${data.id}`);

        return Promise.resolve(response.data);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const { setPosts, setTotal } = PostSlice.actions;
export default PostSlice.reducer;