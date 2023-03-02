import React, { useState, useEffect, useRef } from "react";
import TextField from "../../UI/fields/TextField";
import { isNumber, numberValidation } from "../../utils/validators/validators";
import Svg from "../../components/Svg";
import { AuthenticateService } from "../../services/authenticateService";
import { useParams, useNavigate } from "react-router-dom";

function VerifyEmail() {
	const inputCount = 6;
	const inputsRef = useRef([]);
	const [disabled, setDisabled] = useState(true);
	const service = new AuthenticateService();
	const { accountId } = useParams();
	const navigate = useNavigate();

	const [verifyCode, setVerifyCode] = useState("");

	const replaceByIndex = (str, index, symbol) => {
		if (index >= str.length) {
			return str + symbol.padStart(index - str.length + 1, ' ');
		}

		return str.slice(0, index) + symbol + str.slice(index + 1);
	};

	useEffect(() => {
		if (verifyCode.length === inputCount && isNumber(verifyCode)) {
			setDisabled(!disabled);
		} else setDisabled(true);
	}, [verifyCode])

	const handleChangeNumber = (e, index) => {
		if (e.target.value === "") {
			setVerifyCode(replaceByIndex(verifyCode, index, " "));
			return;
		}

		const temp = verifyCode;
		const code = numberValidation(e.target.value);

		if (code === null) {
			e.target.value = code;
			return;
		}

		setVerifyCode(replaceByIndex(temp, index, code));
		if (e.target.value.length === 1) {
			if (index + 1 < inputCount) {
				inputsRef.current[index + 1].focus();
			}
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!Number(verifyCode))
			return;

		const isOK = await service.verifyRegistration({
			accountId: accountId,
			verificationToken: verifyCode,
		});

		if (isOK)
			navigate("/registration-complete");
		else
			setVerifyCode("");
	};

	return (
		<div className="w-full h-screen flex relative text-center">
			<div className="w-full h-screen relative bg-white">
				<Svg type="verifyWave" className="object-cover h-full w-full" />
			</div>
			<div className="w-[70%] shadow-md h-5/6 bg-white z-10 mx-auto my-0 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center flex flex-col justify-center">
				<Svg type="verifyEmail" className="w-[23%] mx-auto my-8" />
				<h1 className="text-4xl font-medium my-6">
					Please Verify Account
				</h1>
				<p className="text-stone-400 my-6">
					Enter the six digit code we sent to your email address to
					verify your new account:
				</p>
				<form onSubmit={handleSubmit}>
					<div className="mx-auto w-[40%] my-0 flex justify-around items-center">
						{Array.from({ length: inputCount }).map((item, index) => (
							<TextField
								ref={(el) => inputsRef.current[index] = el}
								tabIndex={index + 1}
								key={index}
								maxLength="1"
								onChange={(e) => handleChangeNumber(e, index)}
								type="text"
								className="w-14 rounded-none hover:border-stone-500 focus:border-stone-600 focus:outline-none text-4xl text-center h-24 bg-white"
							/>
						))}
					</div>
					<button className="my-10 py-3 px-12 bg-[#453e35] enabled:hover:bg-stone-500 duration-300 font-medium text-white disabled:opacity-50" disabled={disabled}>
						Verify & Continue
					</button>
				</form>
			</div>
		</div>
	);
}

export default VerifyEmail;
