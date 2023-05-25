import React, { useEffect, useRef } from "react";
import { NotificatinMessage } from "../NotificationMessage";
import { useSelector } from 'react-redux'
import { selectNotification } from "../../features/chatsSlice";

export function NotificatinContainer() {
	const messages = useSelector(selectNotification);
	const scrollDown = useRef(null);

	useEffect(() => {
		console.log(messages)
		scrollDown.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		messages && messages.length > 0 &&
		(<div className="absolute w-60 h-screen z-50 top-0 right-10 flex flex-col overflow-y-auto scroll-none p-2 pt-8">
			{messages.map((element, index) => (
				<NotificatinMessage
					key={index}
					content={element.content}
					image={element.image}
					userName={element?.user?.fullName}
				/>
			))}
			<div ref={scrollDown}></div>
		</div>
		))


}
