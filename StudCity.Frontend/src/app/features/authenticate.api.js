import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthenticateService } from '../../services/authenticateService';
import { showAlert } from '../../services/showAlert';
import { googleAuthenticate } from '../../services/googleService';

const authService = new AuthenticateService();

export const googleLogin = createAsyncThunk(
    'authenticate/googleLogin',
    async (googleAccessToken, { fulfillWithValue, rejectWithValue }) => {
        try {
            const { name, picture, email, hd } = await googleAuthenticate(googleAccessToken);

            const { isRegistration, isSuccess } = await authService.googleLogin({ name, picture, email, hd });
            if (isSuccess) {
                return fulfillWithValue({ isSuccess, isRegistration });
            }

            throw new Error('Google authentication failed');
        } catch (error) {
            if (error.response) {
                showAlert(error.response.data.error, 'error');
            } else {
                showAlert('Something went wrong!', 'error');
            }

            return rejectWithValue({ isSuccess: false });
        }
    }
);
