import React, { useEffect, useRef } from "react";
import HeaderChat from "../../components/HeaderChat";
import Sender from "../../components/Sender";
import Message from "../../components/Message";
import { useSelector, useDispatch } from "react-redux"
import { selectCurrentUserId } from "../../app/features/userSlice"
import { useParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { fetchChat, selectChat, selectChatLoading } from "../../app/features/chatsSlice";

export default function Chat({ signalR }) {
	const { chatId } = useParams();
	const dispatch = useDispatch();

	const chat = useSelector(selectChat);
	const loading = useSelector(selectChatLoading);
	const id = useSelector(selectCurrentUserId);

	const scrollDown = useRef(null);

	useEffect(() => {
		chatId && dispatch(fetchChat(chatId));
	}, [chatId])

	useEffect(() => {
		scrollDown.current?.scrollIntoView({ behavior: 'smooth' })
	}, [chat.messages])

	const sendMessage = (message) => {
		signalR.sendMessage(chatId, message);
	}

	return loading ? (
		<Spinner />
	) : (
		<div className="w-full h-full flex flex-col justify-between bg-elephantBone" >
			<HeaderChat title={chat.title} users={chat.users} />
			<div className="h-[calc(100%-10rem)] w-full overflow-y-auto scroll-none">
				{
					chat.messages.map((message, index) => (
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
				<Sender sendMessage={sendMessage} />
			</div>
		</div>
	)
}