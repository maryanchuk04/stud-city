import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Label from "../../UI/Label";
import TextField from "../../UI/fields/TextField";
import PasswordTextField from "../../UI/fields/PasswordTextField";
import Button from "../../UI/Button";
import GoogleButton from "../../UI/GoogleButton";
import { passwordMatchValidation, passwordValidation } from "../../utils/validators/validators";
import { AuthenticateService } from "../../services/authenticateService";

function Registration() {
	const navigate = useNavigate('');
	const service = new AuthenticateService();

	const [disabled, setDisabled] = useState(false)
	const [formState, setFormState] = useState({
		email: "",
		password: "",
		confirmPassword: ""
	})

	const handleChangeEmail = (event) => {
		setFormState({ ...formState, email: event.target.value })
	}

	const handleChangePassword = (event) => {
		setFormState({ ...formState, password: event.target.value })
	}

	const handleChangeConfirmPassword = (event) => {
		setFormState({ ...formState, confirmPassword: event.target.value })
	}

	const handleSubmit = async (event) => {
		event.preventDefault();

		const accountId = await service.registration({ email: formState.email, password: formState.password });
		console.log(accountId);
		if (accountId)
			navigate(`/verify-email/${accountId}`);
		else
			setFormState({ email: "", password: "", confirmPassword: "" })
	}


	return (
		<div className="w-1/1 h-screen flex">
			<div className="w-1/2 h-screen ">
				<img className="w-full h-screen object-cover" src="/images/Image-Registration-Light.jpg" alt="404" />
			</div>
			<div className="form w-1/2 h-screen flex bg-primatyWhite">
				<div className="container flex flex-col w-4/5 m-auto h-[95%] bg-primatyWhite rounded-3xl p-11 shadow-md ">
					<h1 className="w-full text-center font-bold text-4xl my-3 text-primaryRegistration">Welcome</h1>
					<h6 className="w-full text-center font-normal text-lg text-primaryRegistration">Please enter your details</h6>
					<form className="flex flex-col w-1/1" onSubmit={handleSubmit}>
						<Label>Email</Label>
						<TextField
							placeholder="Enter your email"
							className=""
							type="email"
							required={true}
							value={formState.email}
							handleChange={handleChangeEmail}
						/>
						<Label>Password</Label>
						<PasswordTextField
							placeholder="Enter your password"
							className=""
							required={true}
							setDisabled={setDisabled}
							handleChange={handleChangePassword}
							value={formState.password}
							secondValue={formState.confirmPassword}
							validate={passwordValidation}
						/>
						<Label>Repeat password</Label>
						<PasswordTextField
							placeholder="Repeat your password"
							className=""
							required={true}
							setDisabled={setDisabled}
							handleChange={handleChangeConfirmPassword}
							value={formState.confirmPassword}
							secondValue={formState.password}
							validate={passwordMatchValidation}
						/>
						<Button
							disabled={disabled}
							className={"bg-primaryRegistration"}
						>Submit</Button>
						<div className="flex justify-between my-2 items-center">
							<hr className="w-[40%] h-0.5 bg-[#D1D7D4] ml-3" />
							<span className="w-[10%] text-center text-[#506466]">or</span>
							<hr className="w-[40%] h-0.5 bg-[#D1D7D4] mr-3" />
						</div>
						<GoogleButton className={"text-primaryRegistration border-primaryRegistration"} />
					</form>
					<div className=" w-full text-center ml-1 mt-3 font-medium text-base"><a className="mr-1 cursor-pointer text-[#233a2a]">If you have account?</a><span className="text-primaryRegistration">Sign in</span></div>
				</div>
			</div>
		</div>
	);
}

export default Registration;
