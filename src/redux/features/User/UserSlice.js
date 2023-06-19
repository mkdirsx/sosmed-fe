import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import URLAPI from "../../../support/constants/URLAPI";

const initialState = {
    user: {}
};

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        setUser: (initialState, action) => {
            initialState.user = action.payload;
        }
    }
});

export const getUser = (data) => async(dispatch) => {
    try {
        const response = await axios.get(`${URLAPI}/auth/${data.id}`);
        
        localStorage.setItem('user', JSON.stringify(response.data.data));
        dispatch(setUser(response.data.data));
        return Promise.resolve(response.data);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const login = (data) => async(dispatch) => {
    try {
        const response = await axios.post(`${URLAPI}/auth/login`, {
            username: data.username,
            password: data.password
        });

        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        localStorage.setItem('token', response.data.data.token);
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
        
        return Promise.resolve(response.data);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const updateUser = (data) => async(dispatch) => {
    try {
        const response = await axios.patch(`${URLAPI}/auth/${data.id}`, {
           username: data.username,
           desc: data.desc,
           image: data.image
        }, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        
        setTimeout(() => {
            dispatch(getUser({id: data.id})).then(
                () => {

                },
                (error) => {
                    return Promise.reject(error);
                }
            )
        }, 200);

        return Promise.resolve(response.data);
    }
    catch(error) {
        return Promise.reject(error);
    }
};

export const sendEmail = (data) => async(dispatch) => {
    try {
        const response = await axios.get(`${URLAPI}/auth/activation/${data.id}`);

        return Promise.resolve(response.data);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const verifyAccount = (data) => async(dispatch) => {
    try {
        const response = await axios.patch(`${URLAPI}/auth/verify/${data.id}`, {
            code: data.code
        });

        return Promise.resolve(response.data);
    }
    catch(error) {
        return Promise.reject(error);
    }
}

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;