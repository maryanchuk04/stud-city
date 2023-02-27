import React, { useState }  from "react";
import PasswordTextField from "../../UI/fields/PasswordTextField";
import Button from "../../UI/Button";
import { passwordValidation, passwordMatchValidation } from "../../utils/validators/validators";
import Svg from "../../components/Svg";

function RecoveryPassword() {

	const [disabled, setDisabled] = useState(false);

	const [formState, setFormState] = useState({
		password: "",
		confirmPassword: ""
	})

	const handleChangePassword = (event) => {
		setFormState({ ...formState, password: event.target.value });
	}

	const handleChangeConfirmPassword = (event) => {
		setFormState({ ...formState, confirmPassword: event.target.value });
	}

    return (
		<div className="w-full h-screen flex relative ">
					<Svg 
						type="bgRecoveryPassword" 
						className="h-full w-full object-cover m-auto " 
					/>
			<div className="w-1/2 bg-white  h-[85%] flex flex-col m-auto shadow-form rounded-xl absolute  -translate-x-2/4 -translate-y-2/4 top-1/2 left-1/2">
				<h1 className="text-3xl text-center font-medium mt-3">
					Recovery password 
				</h1>
				<div className="h-[40%] w-full flex">
					<Svg 
						type="recoverPassword" 
						className="h-[90%]  object-contain m-auto" 
					/>
				</div>
				<form className="w-96 h-80  m-auto" action="">
						<PasswordTextField
							placeholder="Enter new password"
							className=""
							required={true}
							setDisabled={setDisabled}
							onChange={handleChangePassword}
							value={formState.password}
							confirmationValue={formState.confirmPassword}
							validate={passwordValidation}
						/>
					<PasswordTextField
							placeholder="Repeat password"
							className=""
							required={true}
							setDisabled={setDisabled}
							onChange={handleChangeConfirmPassword}
							value={formState.confirmPassword}
							confirmationValue={formState.password}
							validate={passwordMatchValidation}
						/>
					<Button disabled={disabled} >Submit</Button>
				</form>
			</div>
			
		</div>
    );
}

export default RecoveryPassword;
