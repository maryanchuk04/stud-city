import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthenticateService } from "../../services/authenticateService";
import { emailValidator } from "../../utils/validators/validators";
import Label from "../../UI/Label";
import PasswordTextField from "../../UI/fields/PasswordTextField";
import Button from "../../UI/Button";
import GoogleButton from "../../UI/GoogleButton";
import ValidateTextField from "../../UI/fields/ValidateTextField";
import { handleChangeSpinerState } from "../../app/features/fetchSpinnerSlice";
import { connectToChatHub, fetchUserChats } from "../../app/features/chatsSlice";

function Authenticate() {
	const authenticateSerivice = new AuthenticateService();
	const navigate = useNavigate('');
	const dispatch = useDispatch();

	const [disabled, setDisabled] = useState(false);
	const [formState, setFormState] = useState({
		email: "",
		password: ""
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		dispatch(handleChangeSpinerState());

		const isOk = await authenticateSerivice.authenticate(formState);

		if (isOk) {
			dispatch(fetchUserChats());
			dispatch(connectToChatHub());
			navigate("/profile");
		}
		else
			setFormState({ email: "", password: "" });

		dispatch(handleChangeSpinerState());
	}

	return (
		<div className="w-1/1 h-screen flex">
			<div className="w-1/2 h-screen flex bg-primatyWhite">
				<div className="container flex flex-col w-2/3 m-auto h-4/5 justify-between bg-primatyWhite rounded-3xl p-11 py-20 shadow-md ">
					<h1 className="w-full text-center font-bold text-4xl text-primaryAuthentication">Welcome back</h1>
					<form className="flex flex-col w-1/1" onSubmit={handleSubmit}>
						<Label>Email</Label>
						<ValidateTextField
							placeholder="Enter your email"
							value={formState.email}
							withErrorMessage={true}
							setDisabled={setDisabled}
							validator={emailValidator}
							onChange={(value) => setFormState({ ...formState, email: value })}
						/>
						<Label>Password</Label>
						<PasswordTextField
							placeholder="Enter your password"
							type="password"
							value={formState.password}
							setDisabled={setDisabled}
							onChange={(event) => setFormState({ ...formState, password: event.target.value })}
						/>
						<Link to="/forgot-password" className="w-full text-center ml-1 font-medium text-base text-primaryAuthentication" href="">Forgot password</Link>
						<Button
							disabled={disabled || formState.email === "" || formState.password === ""}
							className="disabled:opacity-50"
						>
							Submit
						</Button>
						<div className="flex justify-between my-2 items-center">
							<hr className="w-[40%] h-0.5 bg-customGray ml-3" />
							<span className="w-[10%] text-center text-[#506466]">or</span>
							<hr className="w-[40%] h-0.5 bg-customGray mr-3" />
						</div>
						<GoogleButton />
					</form>
					<div className=" w-full text-center ml-1 mt-3 font-medium text-base"><Link to="/registration" className="mr-1 cursor-pointer text-[#233a2a]">Don`t have an account?<span className="text-primaryRegistration ml-2">Sign up</span></Link></div>
				</div>
			</div>
			<div className="w-1/2 h-screen ">
				<img loading="lazy" className="w-full h-screen object-cover object-bottom" src="/images/Image-Authenticate-Light.jpg" alt="404" />
			</div>
		</div>
	);
}

export default Authenticate;
