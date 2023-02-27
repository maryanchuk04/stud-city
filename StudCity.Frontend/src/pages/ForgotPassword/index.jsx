import React, { useState }  from "react";
import ValidateTextField from "../../UI/fields/ValidateTextField";
import Button from "../../UI/Button";
import Svg from "../../components/Svg";
import { emailValidator } from "../../utils/validators/validators";


function ForgotPassword() {
	const [email, setEmail] = useState("");
	
	const handleChangeEmail = (value) => {
		setEmail(value);
	}

    return (
		<div className="w-full h-screen flex relative ">
				<Svg 
					type="bgForgotPassword" 
					className="h-full w-full object-cover m-auto " 
				/>
			<div className="w-1/2 bg-white  h-[85%] flex flex-col m-auto shadow-form rounded-xl absolute  -translate-x-2/4 -translate-y-2/4 top-1/2 left-1/2">
				<h1 className="text-3xl text-center font-medium my-6">
					Recovery password  form
				</h1>
				<div className="h-2/4 w-full flex">
					<Svg 
						type="forgotPassword" 
						className="h-[90%]  object-contain m-auto" 
					/>
				</div>
				<form className="w-96 h-80  m-auto" action="">
					<ValidateTextField
							placeholder="Enter your email"
							required={true}
							value={email}
							withErrorMessage={true}
							validator={emailValidator}
							onChange={handleChangeEmail}
						/>
					<Button disabled={email === ""}>Submit</Button>
				</form>
			</div>
			
		</div>
    );
}

export default ForgotPassword;
