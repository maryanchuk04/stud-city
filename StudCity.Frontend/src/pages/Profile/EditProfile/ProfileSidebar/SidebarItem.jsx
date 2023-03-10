import React from "react";

const SidebarItem = ({ icon, title, handleClick, isActive }) => {
	return <li className={`flex items-center list-none text-xl rounded-xl shadow-form p-2 px-4 my-6 cursor-pointer text-white ${isActive ? "bg-primaryAuthentication scale-105" : "bg-stone-400 hover:bg-stone-600 duration-500"}`}
		onClick={handleClick}
	>
		<i className={`${icon} mr-2`}></i>
		{title}
	</li>
}

export default SidebarItem;