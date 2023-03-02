import React from "react";
import Svg from '../../../components/Svg'
import TextField from "../../../UI/fields/TextField";
import SelectField from "../../../UI/fields/SelectField";
import DatePicker from "../../../UI/DatePicker";
import ValidateTextField from "../../../UI/fields/ValidateTextField";
import { GENDERS } from "../../../utils/constants";
import { phoneNumberValidator } from "../../../utils/validators/validators";

const UserInformation = ({ userInformation, setUserInformation }) => {

	const handleNumberChange = (value) => {
		if (value.length > 3)
			setUserInformation({ ...userInformation, phoneNumber: value });
	};

	return (
		<div>
			<h1 className="text-4xl text-center">Your Personal Information</h1>
			<div>
				<Svg type="personalInfoStepSvg" className="mx-auto " />
				<div className="flex gap-20">
					<div className="w-1/2">
						<TextField
							className="h-12"
							placeholder="First name"
							value={userInformation.firstName}
							onChange={(e) => setUserInformation({
								...userInformation,
								firstName: e.target.value,
							})}
						/>
						<TextField
							className="h-12"
							placeholder="Last name"
							value={userInformation.lastName}
							onChange={(e) => setUserInformation({
								...userInformation,
								lastName: e.target.value,
							})}
						/>
						<TextField
							className="h-12"
							placeholder="User name"
							value={userInformation.userName}
							onChange={(e) => setUserInformation({
								...userInformation,
								userName: e.target.value,
							})}
						/>
					</div>
					<div className="w-1/2 text-center">
						<div>
							<SelectField
								className=""
								options={GENDERS}
								onChange={(e) => setUserInformation({
									...userInformation,
									gender: e.target.value,
								})}
								value={userInformation.gender}
							/>
							<ValidateTextField
								className="h-12"
								placeholder="Phone number"
								validator={phoneNumberValidator}
								value={userInformation.phoneNumber}
								withErrorMessage={false}
								onChange={handleNumberChange}
							/>
							<DatePicker
								value={new Date(userInformation.birthday || "").toLocaleDateString()}
								className=""
								onChange={(e) => setUserInformation({
									...userInformation,
									birthday: new Date(e).toISOString(),
								})}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserInformation;
