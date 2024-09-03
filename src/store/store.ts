import { configureStore } from '@reduxjs/toolkit';
import userReducer from '@slices/user-slice';
import { userApi } from '@api/user-api';


export const store = configureStore({
    reducer: {
        user: userReducer,  // User slice reducer
        [userApi.reducerPath]: userApi.reducer, 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
