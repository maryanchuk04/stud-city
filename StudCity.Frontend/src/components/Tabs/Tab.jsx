import React from 'react'

const Tab = ({ label = "Hello", isActive, toggle }) => {
	return (
		<div className={`text-2xl font-bold cursor-pointer text-center w-full p-3 ${isActive && "border-b-2 border-primaryGold"} hover:border-b-2 hover:border-primaryGold duration-150 hover:text-primaryGold`} onClick={toggle}>
			<span className={isActive && "text-primaryGold"}>{label}</span>
		</div>
	)
}

export default Tab