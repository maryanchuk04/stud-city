import React from "react";
import Avatar from "../../../../UI/Avatar";
import { formatDateTime } from "../../../../utils/dates";
import IconButton from "../../../../UI/IconButton";

export default function Post({ content, when = new Date(), fullName, image }) {
	return (
		<div className={`w-fit h-fit max-w-[65%] flex items-center mr-auto ml-10`}>
			<div className="h-full w-fit flex mt-2 mb-auto">
				<Avatar
					className={`!w-12 !h-12 mx-0`}
					src={image}
				/>
			</div>
			<div className="w-fit">
				<div className={`ml-5 w-fit flex justify-between mt-2`}>
					<span className={`text-sm font-bold`}>{fullName}</span>
					<span className={`ml-6 text-xs text-[#6d6d6d]`}>{formatDateTime(when)}</span>
				</div>
				<div className={`bg-[#e5e3bc] ml-5 mt-3 w-fit rounded-tr-xl rounded-bl-xl flex flex-col rounded-br-2xl p-4 pb-0`}>
					<div className="w-full h-full mb-2">
						<img
							src="/images/ChnuBackground.png"
							className="w-full h-full"
						/>
					</div>
					<span className="text-justify">
						{content}
					</span>
					<ContainerComments />
				</div>
			</div>
		</div >
	)
}

function ContainerComments() {
	return (
		<div className="h-10 w-full flex flex-col cursor-pointer hover:opacity-80">
			<hr className="w-full h-[0.5px] border-0 bg-[#abaa91]" />
			<div className="h-full w-full justify-between flex items-center">
				<span className="text-[#355e2f] font-medium"><i className="fa-regular fa-comment ml-1 mr-3"></i>Leave a comment</span>
				<IconButton className="hover:bg-transparent h-fit"><i className="fa-solid fa-angle-right text-[#453e35]"></i></IconButton>
			</div>
		</div>
	)
}