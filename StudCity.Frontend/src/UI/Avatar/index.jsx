import React from "react";

function Avatar({ src, className = "" }) {
	return(
		<div className={`rounded-full h-44 mx-auto w-44 overflow-hidden ${className}`}>
				<img src={src} className="w-full h-full object-contain" alt="" />
		</div>
	);
}
export default Avatar;