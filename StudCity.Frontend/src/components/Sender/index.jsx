import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux/es/exports";
import { selectHubConnection } from "../../features/chatsSlice";
import { selectCurrentUserData } from "../../features/userSlice";
import useSound from "use-sound";
import sendMessageSound from "../../assets/sounds/send-message.mp3"
import Button from "../../UI/Button";

export default function Sender({ sendMessage, chatId, scrollDown }) {
	const [play] = useSound(sendMessageSound);
	const [isTyping, setIsTyping] = useState(false);
	const hubConnection = useSelector(selectHubConnection);
	const { fullName } = useSelector(selectCurrentUserData);
	const [value, setValue] = useState("");
	const textAreaRef = useRef(null);


	useEffect(() => {
		let timeoutId = null;
		if (!isTyping) {
			timeoutId = setTimeout(handleStopInput, 4000)
		}

		return () => clearTimeout(timeoutId);
	}, [isTyping])

	const resizeTextArea = () => {
		textAreaRef.current.style.height = "20px";
		textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
	};

	const handleKeyDowm = (event) => {
		scrollDown();
		setIsTyping(true);
		if (event.keyCode === 13 && !event.shiftKey) {
			event.preventDefault();
			handleClick();
		} else if (event.keyCode === 13 && event.shiftKey) {
			textAreaRef.current.value += "\n";
		}
	}

	const handleKeyUp = () => {
		setIsTyping(false);
	}

	const handleChange = e => {
		hubConnection.invoke("Typing", chatId, fullName);
		resizeTextArea()
		setValue(e.target.value);
	};

	const handleClick = () => {
		if (value.trim() !== "") {
			sendMessage(value);
			play();
			setValue("");
		}
	}

	const handleStopInput = () => {
		hubConnection.invoke("StopTyping", chatId, fullName);
	}

	return (
		<form
			className="h-fit w-11/12 items-center mx-auto my-auto flex rounded-xl border-[#647962] border-2"
		>
			<textarea
				className="ml-5 w-10/12 max-h-[100px] h-6 bg-transparent border-0 border-[#647962] outline-none resize-none scroll-none font-medium text-[#647962] placeholder:text-[#647962]"
				placeholder="Input your message"
				value={value}
				ref={textAreaRef}
				onChange={handleChange}
				onKeyUp={handleKeyUp}
				onKeyDown={(event) => handleKeyDowm(event)}
			/>
			<Button
				className="bg-transparent w-12 mt-auto mr-4 ml-auto text-[#647962]"
				onClick={handleClick}
				type="submit"
			>
				<i className="fa-solid fa-paper-plane"></i>
			</Button>
		</form>
	)

}