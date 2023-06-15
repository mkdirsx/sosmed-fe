import { createSlice } from "@reduxjs/toolkit";

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

export const { setUsername } = UserSlice.actions;
export default UserSlice.reducer;