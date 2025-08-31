import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types";

interface UserState {
    user: IUser | null;
    isAuth: boolean;
}

const initialState: UserState = {
    user: null,
    isAuth: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
            state.isAuth = true
        },
        clearUser: (state) => {
            state.user = null,
            state.isAuth = false
        }
    },
})

export const { setUser, clearUser } = userSlice.actions

const userReducer = userSlice.reducer

export default userReducer