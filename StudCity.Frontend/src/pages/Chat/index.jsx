import React, { useState, useEffect, useRef } from "react";
import HeaderChat from "../../components/HeaderChat";
import Sender from "../../components/Sender";
import Message from "../../components/Message";
import { TEST_ARRAY_MESSAGES } from "../../utils/constants";
import { useSelector } from "react-redux"
import { selectCurrentUserId } from "../../app/features/userSlice"

export default function Chat() {
	const [messages, setMessages] = useState(TEST_ARRAY_MESSAGES);
	const id = useSelector(selectCurrentUserId);
	const scrollDown = useRef(null);
	useEffect(() => {
		scrollDown.current.scrollIntoView({ behavior: 'smooth' })
	}, [messages])
	const sendMessages = (message) => {
		setMessages([...messages, message])
	}
	return (
		<div className="w-full h-full flex flex-col justify-between bg-elephantBone">
			<HeaderChat />
			<div className="h-[calc(100%-5rem-16.7%)] w-full overflow-y-auto">
				{
					messages.map(message => (
						<Message
							id={id}
							userId={message.user.id}
							fullName={message.user.fullName}
							image={message.user.image}
							content={message.content}
							when={message.when}
							key={message.id}
						/>
					))
				}
			</div>
			<div className="h-fit w-full flex py-3">
				<Sender sendMessages={sendMessages} />
			</div>
		</div>
	)
}