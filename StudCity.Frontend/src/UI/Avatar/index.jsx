import React from "react";

function Avatar({ src, className = "", children }) {
	return (
		<div className={`rounded-full mx-auto overflow-hidden ${className}`}>
			<img src={src} className="w-full h-full object-contain" alt="" />
			{children}
		</div>
	);
}

export default Avatar;
