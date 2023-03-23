import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUserData } from "../../app/features/userSlice";
import Button from "../../UI/Button";

export default function Sender({ sendMessages }) {
	const { id, fullName } = useSelector(selectCurrentUserData)
	const [value, setValue] = useState("");
	const textAreaRef = useRef(null);
	const resizeTextArea = () => {
		textAreaRef.current.style.height = "auto";
		textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
	};
	const handleChange = e => {
		resizeTextArea()
		setValue(e.target.value);
	};

	const handleClick = () => {
		if (value.trim() !== "") {
			sendMessages({
				content: value,
				user: {
					id: id,
					fullName: fullName
				},
				when: "23.03.2023",
			});
			setValue("");
		}
	}

	return (
		<div className="h-fit w-11/12 items-center mx-auto my-auto flex rounded-xl border-[#647962] border-2">
			<textarea
				className="ml-5 w-10/12 bg-transparent border-0 border-[#647962] outline-none resize-none pt-2 font-medium text-[#647962] placeholder:text-[#647962]"
				placeholder="Input your message"
				id="message-area"
				value={value}
				style={{ maxHeight: "100px" }}
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