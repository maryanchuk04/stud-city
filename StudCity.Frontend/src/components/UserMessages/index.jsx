import React from "react";
import Avatar from "../../UI/Avatar";

export function UserMessages({ fullName, lastDate, lastMessage }) {

	const subText = (text, length) => {
		return text.length >= length ? `${text.substring(0, length)}...` : text;
	}
	return (
		<div className="w-full mx-auto h-24 flex border-b-[1px] border-gray-300 py-3 pl-1 last:border-0 cursor-pointer hover:bg-customGreen scroll-none">
			<Avatar className="w-14 h-14 mx-0" />
			<div className="flex w-8/12 h-full justify-between flex-col ml-4">
				<div className="flex justify-between mt-2">
					<span className="text-sm font-bold">{subText(fullName, 10)}</span>
					<span className="text-xs text-[#6d6d6d]">{lastDate}</span>
				</div>
				<span className="text-sm text-[#6d6d6d]" >{subText(lastMessage, 25)}</span>
			</div>
		</div>
	)
}