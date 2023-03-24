import React, { useState, useRef } from "react";
import Button from "../../UI/Button";

export default function Sender({ sendMessage }) {
	const [value, setValue] = useState("");
	const textAreaRef = useRef(null);
	const resizeTextArea = () => {
		textAreaRef.current.style.height = "20px";
		textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
	};
	const handleChange = e => {
		resizeTextArea()
		setValue(e.target.value);
	};

	const handleClick = () => {
		if (value.trim() !== "") {
			sendMessage(value);
			setValue("");
		}
	}

	return (
		<div className="h-fit w-11/12 items-center mx-auto my-auto flex rounded-xl border-[#647962] border-2">
			<textarea
				className="ml-5 w-10/12 max-h-[100px] h-6 bg-transparent border-0 border-[#647962] outline-none resize-none scroll-none font-medium text-[#647962] placeholder:text-[#647962]"
				placeholder="Input your message"
				value={value}
				ref={textAreaRef}
				onChange={handleChange}

			/>
			<Button
				className="bg-transparent w-12 mt-auto mr-4 ml-auto text-[#647962]"
				onClick={handleClick}
			>
				<i className="fa-solid fa-paper-plane"></i>
			</Button>
		</div>
	)

}