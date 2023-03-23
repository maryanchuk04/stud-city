import React, { useState, useEffect, useRef } from "react";
import HeaderChat from "../../components/HeaderChat";
import Sender from "../../components/Sender";
import Message from "../../components/Message";
import { TEST_ARRAY_MESSAGES } from "../../utils/constants";
import { useSelector } from "react-redux"
import { selectCurrentUserId } from "../../app/features/userSlice"
import { useParams } from "react-router-dom";
import { RoomService } from "../../services/roomService";
import Spinner from "../../components/Spinner";

export default function Chat() {
	const [chat, setChat] = useState(null);
	const { chatId } = useParams();
	const service = new RoomService();
	const [messages, setMessages] = useState(TEST_ARRAY_MESSAGES);
	const id = useSelector(selectCurrentUserId);
	const scrollDown = useRef(null);

	useEffect(() => {
		(async () => {
			setChat(await service.getChatById(chatId))
		})()
	}, [chatId])

	useEffect(() => {
		scrollDown.current?.scrollIntoView({ behavior: 'smooth' })
	}, [messages])

	const sendMessages = (message) => {
		setMessages([...messages, message])
	}

	return !chat ? (
		<Spinner />
	) : (
		<div className="w-full h-full flex flex-col justify-between bg-elephantBone" >
			<HeaderChat title={chat.title} />
			<div className="h-[calc(100%-10rem)] w-full overflow-y-auto scroll-none">
				{
					messages.map((message, index) => (
						<Message
							id={id}
							userId={message.user.id}
							fullName={message.user.fullName}
							image={message.user.image}
							content={message.content}
							when={message.when}
							key={index}
						/>
					))
				}
				<div ref={scrollDown}></div>
			</div>
			<div className="h-fit w-full flex py-3">
				<Sender sendMessages={sendMessages} />
			</div>
		</div>
	)
}