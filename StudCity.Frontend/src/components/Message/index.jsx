import React from "react";
import Avatar from "../../UI/Avatar";

const allContainer = "w-fit h-fit max-w-[80%] flex items-center";
const displayText = "w-fit flex justify-between";
const styleDateText = "text-xs text-[#6d6d6d]";
const styleFullNameText = "text-sm font-bold"
const avatarStyle = "w-12 h-12 mx-0"
const styleMessageText = "mt-3 w-fit rounded-tl-xl rounded-br-xl rounded-bl-2xl p-2"

export default function Message({ userId, content, when, fullName, image, id }) {

	return (
		userId === id ?
			(
				<div className={`${allContainer} ml-auto mr-10`}>
					<div className="w-fit">
						<div className={`ml-auto mr-5 ${displayText} mt-2`}>
							<span className={`mr-6 ${styleDateText}`}>{when}</span>
						</div>
						<div className={`bg-customGreen ml-auto mr-5 ${styleMessageText}`}>
							<span className="break-all whitespace-pre-line">
								{content}
							</span>
						</div>
					</div>
				</div>
			) : (
				<div className={`${allContainer} mr-auto ml-10`}>
					<Avatar
						className={`${avatarStyle}`}
						src={image}
					/>
					<div className="w-fit">
						<div className={`ml-5 ${displayText} mt-2`}>
							<span className={`${styleFullNameText}`}>{fullName}</span>
							<span className={`ml-6 ${styleDateText}`}>{when}</span>
						</div>
						<div className={`bg-[#e5e3bc] ml-5 mt-3 w-fit rounded-tr-xl rounded-bl-xl rounded-br-2xl p-2`}>
							<span className="break-all whitespace-pre-line">
								{content}
							</span>
						</div>
					</div>
				</div>
			)
	)
}