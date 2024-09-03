import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userApi } from '../api/user-api';
import { ILoginRequest, IUser, LoginResponse, RegisterResponse } from '@api/types/user-types';
import Cookies from 'js-cookie';

interface IAuthState {
    isAuthenticated: boolean;
    user: IUser | null;
    loading: boolean;
    error: string | null;
    description: string | null;
}

const initialState: IAuthState = {
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
    description: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthState: (state, action: PayloadAction<{ isAuthenticated: boolean, user: IUser | null }>) => {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.user = action.payload.user;
            state.loading = false;  // Loading is done once this action is dispatched
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.loading = false;
            state.user = null;
            state.error = null;
            Cookies.remove('token');
        },
    },
    extraReducers: (builder) => {
        // REGISTER USER
        builder
            .addMatcher(
                userApi.endpoints.registerUser.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                userApi.endpoints.registerUser.matchFulfilled,
                (state, action: PayloadAction<RegisterResponse>) => {
                    state.loading = false;
                }
            )
            .addMatcher(
                userApi.endpoints.loginUser.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Login failed';
                }
            );

        // LOGIN USER
        builder
            .addMatcher(
                userApi.endpoints.loginUser.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                userApi.endpoints.loginUser.matchFulfilled,
                (state, action: PayloadAction<LoginResponse, string, { arg: { originalArgs: ILoginRequest } }>) => {
                    state.loading = false;
                    state.isAuthenticated = true;

                    const token = action.payload;
                    const { rememberMe } = action.meta.arg.originalArgs;

                    // Determine the expiration time based on rememberMe
                    const expirationTime = rememberMe ? 47 / 24 : 50 / 1440; // 47 hours for rememberMe, 50 minutes otherwise

                    // Store the token in the cookie with the appropriate expiration time
                    Cookies.set('token', token, {
                        secure: process.env.NODE_ENV === 'production',
                        expires: expirationTime,
                    });
                }
            )
            .addMatcher(
                userApi.endpoints.loginUser.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Login failed';
                }
            );

        // LOGOUT USER
        builder
            .addMatcher(
                userApi.endpoints.logoutUser.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                userApi.endpoints.logoutUser.matchFulfilled,
                (state) => {
                    state.loading = false;
                    state.isAuthenticated = false;
                    state.user = null;
                    Cookies.remove('token'); // Remove token on successful logout
                }
            )
            .addMatcher(
                userApi.endpoints.logoutUser.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Logout failed';
                }
            );

        // GET USER
        builder
            .addMatcher(
                userApi.endpoints.getUser.matchPending,
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                userApi.endpoints.getUser.matchFulfilled,
                (state, action: PayloadAction<IUser>) => {
                    state.loading = false;
                    state.isAuthenticated = true;
                    state.user = action.payload;
                }
            )
            .addMatcher(
                userApi.endpoints.getUser.matchRejected,
                (state, action) => {
                    state.loading = false;
                    state.error = action.error?.message || 'Failed to fetch user data';
                    state.isAuthenticated = false;
                    state.user = null;
                }
            );
    },
});

export const { setAuthState, logout } = userSlice.actions;

export default userSlice.reducer;
