import { createSlice } from '@reduxjs/toolkit';
import { googleLogin } from './authenticate.api';

export const authenticateSlice = createSlice({
    name: 'authenticate',
    initialState: {
        loading: false,
    },
    extraReducers: (builder) => {
        builder.addCase(googleLogin.pending, (state) => {
            state.loading = true;
        }),
        builder.addCase(googleLogin.fulfilled, (state) => {
            state.loading = false;
        }),
        builder.addCase(googleLogin.rejected, (state) => {
            state.loading = false;
        });
    },
});

export default authenticateSlice.reducer;

