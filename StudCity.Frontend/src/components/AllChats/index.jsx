import React from "react";
import { UserMessages } from "../UserMessages";
import { useSelector } from "react-redux";
import { selectUserChats } from "../../app/features/chatsSlice";

export function AllChats() {
	const chats = useSelector(selectUserChats)

	return (
		<div className="flex h-5/6 flex-col overflow-y-scroll mt-5 scroll-none">
			{
				chats.map(item => (
					<UserMessages
						id={item.id}
						title={item.title}
						message={item.message}
						key={item.fullName}
					/>
				))
			}
		</div>
	)
}