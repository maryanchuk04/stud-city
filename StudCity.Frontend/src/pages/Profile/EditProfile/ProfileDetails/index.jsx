import React from 'react';
import TextField from "../../../../UI/fields/TextField";
import HeaderEditProfile from '../../../../components/HeaderEditProfile';
import SelectField from "../../../../UI/fields/SelectField";
import ValidateTextField from "../../../../UI/fields/ValidateTextField";
import DatePicker from "../../../../UI/DatePicker";
import { phoneNumberValidator } from '../../../../utils/validators/validators';

const ProfileDetails = () => {
	const containerWithInputs = "flex justify-between w-full mt-10 items-center";
	const inputBlock = "w-1/2 flex justify-between items-center";
	const spanWithInputsBlocks = "ml-16 text-left text-base";
	const textFieldStyle = "w-60 h-10";

	return (
		<div>
			<HeaderEditProfile />
			<div className={containerWithInputs}>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>First name</span>
					<TextField
						className={textFieldStyle}
						placeholder="Input first name"
					/>
				</div>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>Last name</span>
					<TextField
						className={textFieldStyle}
						placeholder="Input last name"
					/>
				</div>
			</div>
			<div className={containerWithInputs}>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>User name</span>
					<TextField
						className={textFieldStyle}
						placeholder="Input user name"
					/>
				</div>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>Gender</span>
					<SelectField
						className={textFieldStyle}
						options={["Male", "Female", "Other"]}
					/>
				</div>
			</div>
			<div className={containerWithInputs}>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>Phone number</span>
					<ValidateTextField
						className={textFieldStyle}
						withErrorMessage={false}
						validator={phoneNumberValidator}
						placeholder="Input your phone"
					/>
				</div>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>Birthday</span>
					<div className="w-60">
						<DatePicker
							className={textFieldStyle}
						/>
					</div>
				</div>
			</div>
			
		</div >
	)
}

export default ProfileDetails