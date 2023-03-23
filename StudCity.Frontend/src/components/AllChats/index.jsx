import React from "react";
import { UserMessages } from "../UserMessages";

export function AllChats() {
	const test = [
		{
			fullName: "Vova Romaniuk",
			lastDate: "21.03.2023",
			lastMessage: "hello hello hello hello hello hellohellohello"
		},
		{
			fullName: "Vova Romaniuk",
			lastDate: "21.03.2023",
			lastMessage: "hello"
		},
		{
			fullName: "Vova Romaniuk",
			lastDate: "21.03.2023",
			lastMessage: "hello"
		},
		{
			fullName: "Vova Romaniuk",
			lastDate: "21.03.2023",
			lastMessage: "hello"
		},
		{
			fullName: "Vova Romaniuk",
			lastDate: "21.03.2023",
			lastMessage: "hello"
		},
		{
			fullName: "Vova Romaniuk",
			lastDate: "21.03.2023",
			lastMessage: "hello"
		},
		{
			fullName: "Vova Romaniuk",
			lastDate: "21.03.2023",
			lastMessage: "hello"
		}
	]
	return (
		<div className="flex h-5/6 flex-col overflow-y-scroll mt-5 scroll-none">
			{
				test.map(item => (
					<UserMessages
						fullName={item.fullName}
						lastDate={item.lastDate}
						lastMessage={item.lastMessage}
						key={item.fullName}
					/>
				))
			}
		</div>
	)
}