import React from "react";
import Avatar from "../../UI/Avatar";
import { Link } from 'react-router-dom'

export function UserMessages({ id, title, message }) {
	const subText = (text, length) => {
		return text.length >= length ? `${text.substring(0, length)}...` : text;
	}

	return (
		<Link to={`/chats/${id}`} className="items-center w-full mx-auto h-24 flex border-b-[1px] border-gray-300 py-3 pl-1 last:border-0 cursor-pointer hover:bg-customGreen scroll-none rounded-md duration-200">
			<Avatar className="w-14 h-14 mx-0" />
			<div className="flex w-8/12 h-full justify-between flex-col ml-4">
				<div className="flex justify-between mt-2 w-full">
					<span className="text-sm font-bold text-ellipsis w-full">{title}</span>
					{message && <span className="text-xs text-[#6d6d6d]">{message.when}</span>}
				</div>
				<span className="text-sm text-[#6d6d6d]" >{message ? subText(message.content, 25) : "Write first message"}</span>
			</div>
		</Link>
	)
}