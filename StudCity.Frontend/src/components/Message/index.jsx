import React from "react";
import Avatar from "../../UI/Avatar";


export default function Message({ userId, content, when, fullName, image, id }) {

	return (
		userId === id ?
			(
				<div className="w-fit h-fit max-w-[80%] flex ml-auto mr-4">

					<div className="w-fit">
						<div className="ml-auto mr-5 w-fit flex justify-between mt-2">
							<span className="mr-10 text-xs text-[#6d6d6d]">{when}</span>
							<span className="text-sm font-bold">{fullName}</span>
						</div>
						<div className="bg-customGreen items-left text-left w-fit ml-auto mr-5 mt-3 rounded-tl-xl rounded-br-xl rounded-bl-2xl p-2">
							<span className="break-all">
								{content}
							</span>
						</div>


					</div>
					<Avatar
						className="w-12 h-12 mx-0"
						src={image}
					/>
				</div>
			)
			:

			(
				<div className="w-fit h-fit max-w-[80%] flex mr-auto ml-4">
					<Avatar
						className="w-12 h-12 mx-0"
						src={image}
					/>
					<div className="w-fit">
						<div className="ml-5 w-fit flex justify-between mt-2">

							<span className="text-sm font-bold">{fullName}</span>
							<span className="ml-10 text-xs text-[#6d6d6d]">{when}</span>
						</div>
						<div className="bg-[#e5e3bc] w-fit ml-5 mt-3 rounded-tr-xl rounded-bl-xl rounded-br-2xl p-2">
							<span className="break-all">
								{content}
							</span>
						</div>


					</div>
				</div>
			)

	)
}