import React from "react";

function ElementViewProfile({ icon, mainText, subText }) {
	return(
		<div className="w-full mx-auto flex items-center">
			<i className={`${icon}  text-4xl w-10 text-center mr-5`}></i>
			<div className="flex flex-col">
				<span className="text-xl text-primaryAuthentication">{mainText}</span>
				<span className="text-sm text-primaryGold">{subText}</span>
			</div>
		</div>
	);
}
export default ElementViewProfile;