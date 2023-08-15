import React, { useState } from 'react';
import TextField from '../../../../UI/fields/TextField';
import HeaderEditProfile from '../../../../components/HeaderEditProfile';
import SelectField from '../../../../UI/fields/SelectField';
import ValidateTextField from '../../../../UI/fields/ValidateTextField';
import DatePicker from '../../../../UI/DatePicker';
import {
	phoneNumberValidator,
	profileDetailsValidator,
} from '../../../../utils/validators/editProfileValidators';
import { useDispatch } from 'react-redux';
import { saveCurrentUser } from '../../../../app/features/userSlice';
import { showAlert } from '../../../../services/showAlert';
import { useTranslation } from 'react-i18next';

const ProfileDetails = ({ user }) => {
	const { t } = useTranslation();
	const containerWithInputs = 'flex justify-between w-full mt-10 items-center';
	const inputBlock = 'w-1/2 flex justify-between items-center';
	const spanWithInputsBlocks = 'ml-16 text-left text-xl';
	const textFieldStyle = 'w-60 h-10';

	const dispatch = useDispatch();

	const [details, setDetails] = useState(user);

	const handleSave = () => {
		if (profileDetailsValidator(details)) {
			dispatch(saveCurrentUser(details));
			return;
		}

		showAlert(t('alert.error.incorrect_data'), 'error');
	};

	const handleCancel = () => {
		setDetails(user);
		showAlert(t('alert.warning.reset_data'), 'warning');
	};

	return (
		<div className='h-full'>
			<HeaderEditProfile
				user={user}
				handleSave={handleSave}
				handleCancel={handleCancel}
				setUser={setDetails}
			/>
			<div className={containerWithInputs}>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>
						{t('profile.details.label.first_name')}
					</span>
					<TextField
						className={textFieldStyle}
						placeholder={t('profile.details.placeholder.first_name')}
						value={details.firstName}
						onChange={(e) => setDetails({ ...details, firstName: e.target.value })}
					/>
				</div>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>
						{t('profile.details.label.last_name')}
					</span>
					<TextField
						className={textFieldStyle}
						placeholder={t('profile.details.placeholder.last_name')}
						value={details.lastName}
						onChange={(e) => setDetails({ ...details, lastName: e.target.value })}
					/>
				</div>
			</div>
			<div className={containerWithInputs}>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>
						{t('profile.details.label.user_name')}
					</span>
					<TextField
						className={textFieldStyle}
						placeholder={t('profile.details.placeholder.user_name')}
						value={details.userName}
						onChange={(e) => setDetails({ ...details, userName: e.target.value })}
					/>
				</div>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>
						{t('profile.details.label.gender')}
					</span>
					<SelectField
						className={textFieldStyle}
						options={['Female', 'Male', 'Other']}
						value={details.gender}
						onChange={(e) => setDetails({ ...details, gender: e.target.value })}
					/>
				</div>
			</div>
			<div className={containerWithInputs}>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>{t('profile.details.label.phone')}</span>
					<ValidateTextField
						className={textFieldStyle}
						validator={phoneNumberValidator}
						placeholder={t('profile.details.placeholder.phone')}
						value={details.phoneNumber}
						onChange={(value) => setDetails({ ...details, phoneNumber: value })}
					/>
				</div>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>
						{t('profile.details.label.birthday')}
					</span>
					<div className='w-60'>
						<DatePicker
							value={new Date(details.dateOfBirthday).toLocaleDateString()}
							className={textFieldStyle}
							onChange={(e) => {
								setDetails({
									...details,
									dateOfBirthday: new Date(e).toISOString(),
								});
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileDetails;
