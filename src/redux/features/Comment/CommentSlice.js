import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import URLAPI from "../../../support/constants/URLAPI";

const initialState = {
    comments: [],
};

export const CommentSlice = createSlice({
    name: 'Comment',
    initialState,
    reducers: {
        setComment: (initialState, action) => {
            initialState.comments = action.payload
        }
    }
});

export const createComment = (data) => async(dispatch) => {
    try {
        const response = await axios.post(`${URLAPI}/comments`, {
            userId: data.userId,
            postId: data.postId,
            comment: data.comment,
            status: data.status
        });

        return Promise.resolve(response.data);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const { setComment } = CommentSlice.actions;
export default CommentSlice.reducer;