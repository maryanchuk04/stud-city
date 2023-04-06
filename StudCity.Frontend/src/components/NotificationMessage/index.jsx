import React from "react";
import Avatar from "../../UI/Avatar";

export function NotificatinMessage({ content, image, userName }) {
	const shortText = (text) => {
		if (text?.length >= 20) {
			return `${text.substring(0, 15)}...`
		}
		else return text
	}
	return (
		<div className="flex w-full h-14 bg-elephantBone shadow-md rounded-2xl p-2 mt-2">
			<Avatar className="w-10 h-10 mx-0" src={image} />
			<div className="ml-3 text w-9/12 text-sm">
				<div className="flex justify-between">
					<span className="font-medium">{userName}</span>
					<span className="text-[#969595] text-right">now</span>
				</div>
				<span>{shortText(content)}</span>
			</div>
		</div>
	)
}