import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import URLAPI from "../../../support/constants/URLAPI";

const initialState = {
    username: ''
};

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUsername: (initialState, action) => {
            initialState.username = action.payload;
        }
    }
});

export const login = (data) => async(dispatch) => {
    try {
        const response = await axios.post(`${URLAPI}/auth/login`, {
            username: data.username,
            password: data.password
        });

        localStorage.setItem('user', JSON.stringify(response.data.data));
        return Promise.resolve(response.data);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const createUser = (data) => async(dispatch) => {
    try {
        const response = await axios.post(`${URLAPI}/auth`, {
           username: data.username,
           password: data.password,
           email: data.email
        });
        
        return Promise.resolve('yes');
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const { setUsername } = UserSlice.actions;
export default UserSlice.reducer;