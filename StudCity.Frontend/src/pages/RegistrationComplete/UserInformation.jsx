import React, { useState } from 'react'
import TextField from '../../UI/fields/TextField'
import SelectField from '../../UI/fields/SelectField'
import DatePicker from '../../UI/DatePicker';
import ValidateTextField from '../../UI/fields/ValidateTextField';
import { genders } from '../../utils/genders';
import { phoneNumberValidator } from '../../utils/validators/validators';

const UserInformation = () => {
	const [userInformation, setUserInformation] = useState({
		firstName: "",
		lastName: "",
		userName: "",
		email: "",
		gender: null,
		phoneNumber: "+380",
		birthday: "",
	});

	return (
		<div className="flex gap-10">
			<div className="w-1/2 ">
				<TextField className="h-14"
					placeholder="Email"
					readOnly={true}
					value={userInformation.email}
					handleChange={(e) => setUserInformation({ ...userInformation, email: e.target.value })}
				/>
				<TextField
					className=""
					placeholder="First name"
					value={userInformation.firstName}
					handleChange={(e) => setUserInformation({ ...userInformation, firstName: e.target.value })}
				/>
				<TextField
					className=""
					placeholder="Last name"
					value={userInformation.lastName}
					handleChange={(e) => setUserInformation({ ...userInformation, lastName: e.target.value })}
				/>
				<TextField
					className=""
					placeholder="User name"
					value={userInformation.userName}
					handleChange={(e) => setUserInformation({ ...userInformation, userName: e.target.value })}
				/>
			</div>
			<div className="w-1/2 text-center">
				<div>
					<SelectField
						className="h-14"
						options={genders}
						onChange={(e) => setUserInformation({ ...userInformation, gender: e.target.value })}
					/>
					<ValidateTextField
						placeholder="Phone number"
						validate={phoneNumberValidator}
						value={userInformation.phoneNumber}
						handleChange={(e) => setUserInformation({ ...userInformation, phoneNumber: e.target.value })}
					/>
					<DatePicker
						className=""
						handleChange={(value) => setUserInformation({ ...userInformation, birthday: new Date(value).toLocaleDateString() })}
					/>
				</div>
			</div>
		</div>
	)
}

export default UserInformation