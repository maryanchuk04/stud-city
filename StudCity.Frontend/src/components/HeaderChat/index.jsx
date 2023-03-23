import React from "react";
import Avatar from "../../UI/Avatar";

export default function HeaderChat() {
	return (
		<div className="w-full h-1/6 flex py-3 justify-between border-b-2 border-gray-300 ">
			<div className="ml-10 w-fit flex">
				<Avatar className="w-14 h-14 mx-0" />
				<div className="ml-5 mt-2">
					<span className=" text-xl font-bold" >Name of Chat </span>
				</div>
			</div>
			<div className=""></div>
		</div>
	);
}