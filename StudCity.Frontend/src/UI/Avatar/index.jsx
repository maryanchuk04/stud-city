import React from "react";
import { DEFAULT_AVATAR_URL } from "../../utils/constants";

function Avatar({ src, className = "", children }) {
	return (
		<div className={`rounded-full mx-auto overflow-hidden ${className}`}>
			<img src={src || DEFAULT_AVATAR_URL} className="w-full h-full object-contain" alt="" />
			{children}
		</div>
	);
}

export default Avatar;
