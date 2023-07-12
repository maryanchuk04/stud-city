import React from 'react';
import Svg from '../components/Svg';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { googleLogin } from '../app/features/authenticate.api';
import { showAlert } from '../services/showAlert';

function GoogleButton({ className = '' }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = useGoogleLogin({
        // eslint-disable-next-line camelcase
        onSuccess: ({ access_token }) => {
            dispatch(googleLogin(access_token)).then(({ payload }) => {
				const { isRegistration, isSuccess } = payload;
                if (isSuccess) {
                    if (isRegistration) {
                        navigate('/registration-complete');
                    } else navigate('/profile');
                }
            });
        },
        onError: () => {
            showAlert('Something went wrong on google side', 'error');
        },
    });

    return (
        <button
            onClick={login}
            type='button'
            className={`flex break-inside bg-white text-primaryAuthentication border-2 border-primaryAuthentication rounded-3xl mx-auto mb-4 w-full h-12 ${className}`}
        >
            <div className='m-auto'>
                <div className='flex items-center justify-start flex-1 space-x-4 text-xl'>
                    <Svg type='googleAuthorized' />
                    <span className='font-medium mb-[-2px] '>Continue with Google</span>
                </div>
            </div>
        </button>
    );
}

export default GoogleButton;
