import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import URLAPI from "../../../support/constants/URLAPI";

const initialState = {
    likes: []
}

export const LikeSlice = createSlice({
    name: 'Like',
    initialState,
    reducers: {
        setLikes: (initialState, action) => {
            initialState.likes = action.payload;
        }
    }
});

export const createLike = (data) => async(dispatch) => {
    try {
        const response = await axios.post(`${URLAPI}/likes`, {
            userId: data.userId,
            postId: data.postId
        });

        return Promise.resolve(response.data);
    }
    catch(error) {
        return Promise.reject(error)
    }
} 

export const { setLikes } = LikeSlice.actions;
export default LikeSlice.reducer;