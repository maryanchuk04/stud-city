import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Label from '../../UI/Label';
import ValidateTextField from '../../UI/fields/ValidateTextField';
import PasswordTextField from '../../UI/fields/PasswordTextField';
import Button from '../../UI/Button';
import GoogleButton from '../../UI/GoogleButton';
import {
	passwordMatchValidation,
	passwordValidation,
	emailValidator,
} from '../../utils/validators/validators';
import { AuthenticateService } from '../../services/authenticateService';
import { handleChangeSpinerState } from '../../app/features/fetchSpinnerSlice';
import { useTranslation } from 'react-i18next';

function Registration() {
	const dispatch = useDispatch();
	const navigate = useNavigate('');
	const { t } = useTranslation();
	const service = new AuthenticateService();

	const [disabled, setDisabled] = useState(false);
	const [formState, setFormState] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});

	const handleChangeEmail = (value) => {
		setFormState({ ...formState, email: value });
	};

	const handleChangePassword = (event) => {
		setFormState({ ...formState, password: event.target.value });
	};

	const handleChangeConfirmPassword = (event) => {
		setFormState({ ...formState, confirmPassword: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		dispatch(handleChangeSpinerState());

		const accountId = await service.registration({
			email: formState.email,
			password: formState.password,
		});
		if (accountId) navigate(`/verify-email/${accountId}`);
		else setFormState({ email: '', password: '', confirmPassword: '' });

		dispatch(handleChangeSpinerState());
	};

	return (
		<div className='w-1/1 h-screen flex'>
			<div className='w-1/2 h-screen '>
				<img
					className='w-full h-screen object-cover'
					src='/images/Image-Registration-Light.jpg'
					alt='404'
					loading='lazy'
				/>
			</div>
			<div className='form w-1/2 h-screen flex bg-primatyWhite'>
				<div className='container flex flex-col w-2/3 m-auto h-[85%] bg-primatyWhite rounded-2xl p-11 justify-between shadow-md '>
					<h1 className='w-full text-center mt-5 font-bold text-3xl text-primaryRegistration'>
						{t('registration.title')}
					</h1>
					<h6 className='w-full text-center font-normal text-lg text-primaryRegistration'>
						{t('registration.pls_enter_details')}
					</h6>
					<form className='flex flex-col w-1/1' onSubmit={handleSubmit}>
						<Label>{t('form.email')}</Label>
						<ValidateTextField
							placeholder={t('form.placeholder.email')}
							required={true}
							value={formState.email}
							withErrorMessage={true}
							setDisabled={setDisabled}
							validator={emailValidator}
							onChange={handleChangeEmail}
						/>
						<Label>{t('form.password')}</Label>
						<PasswordTextField
							placeholder={t('form.placeholder.password')}
							required={true}
							setDisabled={setDisabled}
							onChange={handleChangePassword}
							value={formState.password}
							confirmationValue={formState.confirmPassword}
							validate={passwordValidation}
						/>
						<Label>{t('form.repeat_password')}</Label>
						<PasswordTextField
							placeholder={t('form.placeholder.repeat_password')}
							required={true}
							setDisabled={setDisabled}
							onChange={handleChangeConfirmPassword}
							value={formState.confirmPassword}
							confirmationValue={formState.password}
							validate={passwordMatchValidation}
						/>
						<Button
							disabled={
								disabled ||
								formState.email === '' ||
								formState.password === '' ||
								formState.confirmPassword === ''
							}
							className='bg-primaryRegistration disabled:opacity-50'
						>
							{t('form.submit')}
						</Button>
						<div className='flex justify-between my-2 items-center'>
							<hr className='w-[40%] h-0.5 bg-customGray ml-3' />
							<span className='w-[10%] text-center text-[#506466]'>
								{t('form.or')}
							</span>
							<hr className='w-[40%] h-0.5 bg-customGray mr-3' />
						</div>
						<GoogleButton className='text-primaryRegistration border-primaryRegistration' />
					</form>
					<div className=' w-full text-center ml-1 mt-3 font-medium text-base'>
						<Link to='/authenticate' className='mr-1 cursor-pointer text-[#233a2a]'>
							{t('form.repeat_password')}
							<span className='text-primaryRegistration ml-2'>
								{t('registration.sign_in')}
							</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Registration;
