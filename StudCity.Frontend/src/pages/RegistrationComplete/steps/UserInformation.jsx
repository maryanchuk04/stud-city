import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "../../../UI/fields/TextField";
import SelectField from "../../../UI/fields/SelectField";
import DatePicker from "../../../UI/DatePicker";
import ValidateTextField from "../../../UI/fields/ValidateTextField";
import { genders } from "../../../utils/constants";
import { phoneNumberValidator } from "../../../utils/validators/validators";
import {
	changeUserInformation,
	selectRegisterCompleteUserInformation,
} from "../../../app/features/register-complete/registerCompleteSlice";

const UserInformation = () => {
	const dispatch = useDispatch();
	const defaultData = useSelector(selectRegisterCompleteUserInformation);

	const [userInformation, setUserInformation] = useState({
		firstName: defaultData.firstName || "",
		lastName: defaultData.lastName || "",
		userName: defaultData.userName || "",
		email: defaultData.email || "",
		gender: defaultData.gender || 1,
		phoneNumber: defaultData.phoneNumber || "+380",
		birthday: defaultData.birthday || "",
	});

	const handleNumberChange = (value) => {
		setUserInformation({ ...userInformation, phoneNumber: value });
	};

	useEffect(() => {
		dispatch(changeUserInformation({ ...userInformation }));
	}, [userInformation]);

	return (
		<div>
			<h1 className="text-4xl mb-8 text-center">Your Personal Information</h1>
			<div className="flex gap-10">
				<div className="w-1/2 ">
					<TextField
						className="h-12"
						placeholder="Email"
						readOnly={true}
						handleChange={(e) => setUserInformation({
								...userInformation,
								email: e.target.value,
							})
						}
						value={userInformation.email}
					/>
					<TextField
						className="h-12"
						placeholder="First name"
						value={userInformation.firstName}
						handleChange={(e) => setUserInformation({
								...userInformation,
								firstName: e.target.value,
							})
						}
					/>
					<TextField
						className="h-12"
						placeholder="Last name"
						value={userInformation.lastName}
						handleChange={(e) => setUserInformation({
								...userInformation,
								lastName: e.target.value,
							})
						}
					/>
					<TextField
						className="h-12"
						placeholder="User name"
						value={userInformation.userName}
						handleChange={(e) => setUserInformation({
								...userInformation,
								userName: e.target.value,
							})
						}
					/>
				</div>
				<div className="w-1/2 text-center">
					<div>
						<SelectField
							className=""
							options={genders}
							onChange={(e) => setUserInformation({
									...userInformation,
									gender: e.target.value,
								})
							}
							value={userInformation.gender}
						/>
						<ValidateTextField
							className="h-12"
							placeholder="Phone number"
							validator={phoneNumberValidator}
							value={userInformation.phoneNumber}
							withErrorMessage={false}
							handleChange={handleNumberChange}
						/>
						<DatePicker
							value = {userInformation.birthday}
							className=""
							handleChange={(e) => setUserInformation({
									...userInformation,
									birthday: new Date(
										e
									).toLocaleDateString(),
								})
							}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserInformation;
