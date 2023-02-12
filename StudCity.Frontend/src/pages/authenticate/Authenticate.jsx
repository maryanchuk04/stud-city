import React, { useState } from "react";
import Label from "../../UI/Label";
import TextField from "../../UI/Fields/TextField";
import PasswordTextField from "../../UI/Fields/PasswordTextField";
import Button from "../../UI/Button";
import GoogleButton from "../../UI/GoogleButton";
import { AuthenticateService } from "../../services/authenticateService";
function Authenticate() {
	const authenticateSerivice = new AuthenticateService();

	const [disabled, setDisabled] = useState(false);
	const [formState, setFormState] = useState({ 
		email: "",
		password: ""
	});
	
	const handleSubmit = async (event) => {
		event.preventDefault();
		const res = await authenticateSerivice.authenticate(formState);
		
		console.log(res);
	}

	return (
		<div className="w-1/1 h-screen flex">
			<div className="form w-1/2 h-screen flex bg-primatyWhite">
				<div className="container flex flex-col w-4/5 m-auto h-[85%] bg-primatyWhite rounded-3xl p-11 shadow-md ">
					<h1 className="w-full text-center font-bold text-4xl my-3 text-primaryGreen">Welcome back</h1>
					<h6 className="w-full text-center font-normal text-lg text-primaryGreen">Please enter your details</h6>
					<form className="flex flex-col w-1/1" onSubmit = {handleSubmit}>
						<Label>Email</Label>
						<TextField 
							placeholder = "Enter your email" 
							className = "" 
							type = "email" 
							required = {true}
							onChange = { (event) => setFormState({ ...formState, email: event.target.value }) }
						/>
						<Label>Password</Label>
						<PasswordTextField 
							placeholder = "Enter your password"
							className = "" 
							type = "password" 
							required = {true}
							setDisabled = {setDisabled}
							onChange = { (event) => setFormState({ ...formState, password: event.target.value }) }
						/>
						<a className="w-full text-center ml-1 font-medium text-base text-primaryGreen" href="">Forgot password</a>
						<Button 
							disabled = {disabled}
						>Submit</Button>
						<div className="flex justify-between my-2 items-center">
							<hr className="w-[40%] h-0.5 bg-[#D1D7D4] ml-3"  />
							<span className="w-[10%] text-center text-[#506466]">or</span>
							<hr className="w-[40%] h-0.5 bg-[#D1D7D4] mr-3"/>
						</div>
						<GoogleButton></GoogleButton>
					</form>
					<div className=" w-full text-center ml-1 mt-3 font-medium text-base"><a className="mr-1 cursor-pointer text-[#233a2a]">Don`t have an account?</a><span className="text-primaryGreen">Sign up</span></div>
				</div>
				
			</div>
			<div className="w-1/2 h-screen ">
				<img className="w-full h-screen object-cover" src="/images/Image-Authenticate-Light.png" alt="404" />
			</div>
		</div>
	);
}

export default Authenticate;
