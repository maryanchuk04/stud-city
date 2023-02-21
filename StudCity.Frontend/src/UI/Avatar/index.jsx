import React from "react";

function Avatar({ src, className = "" }) {
	return(
		<div className={`rounded-full h-[180px] mx-auto w-[180px] overflow-hidden ${className}`}>
				<img src={src} className="w-full h-full object-contain" alt="" />
		</div>
	);
}
export default Avatar;