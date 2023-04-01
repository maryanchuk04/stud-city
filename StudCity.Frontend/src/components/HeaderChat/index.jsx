import React from "react";
import Avatar from "../../UI/Avatar";
import IconButton from "../../UI/IconButton";

export default function HeaderChat({ title, users }) {
	return (
		<div className="w-full px-12 h-20 flex py-3 justify-between border-b-2 border-gray-300">
			<div className="w-fit flex">
				<Avatar className="w-14 h-14 mx-0" />
				<div className="ml-5 h-full flex flex-col justify-between">
					<h2 className=" text-xl font-bold" >{title}</h2>
					<p className="text-black/40">{users.length} members</p>
				</div>
			</div>
			<div className="">
				<IconButton className=" bg-transparent hover:bg-black/10">
					<i className="fa-solid fa-ellipsis text-black text-3xl"></i>
				</IconButton>
			</div>
		</div>
	);
}