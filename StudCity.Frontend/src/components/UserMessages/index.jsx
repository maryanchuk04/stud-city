import React from "react";
import Avatar from "../../UI/Avatar";
import { NavLink } from 'react-router-dom'
import { formatDateOrTime } from "../../utils/dates";

export function UserMessages({ id, title, message }) {
	const baseLinkStyles = "items-center w-full mx-auto h-24 pl-3 flex border-customGray-300 cursor-pointer hover:bg-customGreen scroll-none rounded-md duration-200";

	return (
		<div>
			<NavLink to={`/chats/${id}`} className={({ isActive }) => { return isActive ? `${baseLinkStyles} bg-customGreen` : baseLinkStyles }}>
				<Avatar className="w-14 h-14 mx-0" />
				<div className="flex py-3 w-8/12 h-full justify-between flex-col ml-4">
					<div className="flex justify-between w-full">
						<span className="text-sm font-bold text-ellipsis w-full">{title}</span>
						{message && <span className="text-xs text-[#6d6d6d]">{formatDateOrTime(message.when)}</span>}
					</div>
					<span className="text-sm text-[#6d6d6d] truncate" >{message ? message.content : "Write first message"}</span>
				</div>
			</NavLink>
			<hr className="w-full my-2" />
		</div>
	)
}