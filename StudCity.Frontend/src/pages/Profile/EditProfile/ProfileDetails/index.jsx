import React, { useState } from 'react'
import TextField from "../../../../UI/fields/TextField";
import HeaderEditProfile from '../../../../components/HeaderEditProfile';
import SelectField from "../../../../UI/fields/SelectField";
import ValidateTextField from "../../../../UI/fields/ValidateTextField";
import DatePicker from "../../../../UI/DatePicker";
import { phoneNumberValidator, profileDetailsValidator } from '../../../../utils/validators/editProfileValidators';
import { useDispatch } from 'react-redux';
import { saveCurrentUser } from '../../../../app/features/user/userSlice';
import { showAlert } from '../../../../services/showAlert';

const ProfileDetails = ({ user }) => {
	const containerWithInputs = "flex justify-between w-full mt-10 items-center";
	const inputBlock = "w-1/2 flex justify-between items-center";
	const spanWithInputsBlocks = "ml-16 text-left text-xl";
	const textFieldStyle = "w-60 h-10";

	const dispatch = useDispatch();

	const [details, setDetails] = useState(user);

	const handleSave = () => {
		if (profileDetailsValidator(details)) {
			dispatch(saveCurrentUser(details));
			return;
		}

		showAlert("Please input valid data", "error");
	}

	const handleCancel = () => {
		setDetails(user);
		showAlert("Your data has been reset!", "warning")
	}

	return (
		<div className="h-full">
			<HeaderEditProfile
				user={details}
				handleSave={handleSave}
				handleCancel={handleCancel}
				setUser={setDetails}
			/>
			<div className={containerWithInputs}>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>First name</span>
					<TextField
						className={textFieldStyle}
						placeholder="Input first name"
						value={details.firstName}
						onChange={(e) => setDetails({ ...details, firstName: e.target.value })}
					/>
				</div>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>Last name</span>
					<TextField
						className={textFieldStyle}
						placeholder="Input last name"
						value={details.lastName}
						onChange={(e) => setDetails({ ...details, lastName: e.target.value })}
					/>
				</div>
			</div>
			<div className={containerWithInputs}>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>User name</span>
					<TextField
						className={textFieldStyle}
						placeholder="Input details name"
						value={details.userName}
						onChange={(e) => setDetails({ ...details, userName: e.target.value })}
					/>
				</div>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>Gender</span>
					<SelectField
						className={textFieldStyle}
						options={["Female", "Male", "Other"]}
						value={details.gender}
						onChange={(e) => setDetails({ ...details, gender: e.target.value })}
					/>
				</div>
			</div>
			<div className={containerWithInputs}>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>Phone number</span>
					<ValidateTextField
						className={textFieldStyle}
						validator={phoneNumberValidator}
						placeholder="Input your phone"
						value={details.phoneNumber}
						onChange={(value) => setDetails({ ...details, phoneNumber: value })}
					/>
				</div>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>Birthday</span>
					<div className="w-60">
						<DatePicker
							value={new Date(details.dateOfBirthday).toLocaleDateString()}
							className={textFieldStyle}
							onChange={(e) => setDetails({
								...details,
								dateOfBirthday: new Date(e).toISOString(),
							})}
						/>
					</div>
				</div>
			</div>
		</div >
	)
}

export default ProfileDetails