import React from "react";
import IconButton from "../IconButton";

function CustomDialog({ className = "", children, handleClose }) {
	return (
		<div className={`absolute z-40 w-full top-0 left-0 h-screen bg-[#00000050] ${className}`} onClick={handleClose}>
			<div onClick={(e) => e.stopPropagation()} className="bg-white z-50 w-fit h-fit -translate-x-2/4 -translate-y-2/4 left-1/2 top-1/2 absolute rounded-3xl">
				{children}
				<IconButton
					className="absolute w-10 h-10 top-3 right-3 rounded-full hover:bg-black/10 bg-transparent"
					onClick={() => handleClose(false)}
				>
					<i className="fa-solid fa-xmark text-2xl text-black"></i>
				</IconButton>
			</div>
		</div>
	);
}

export default CustomDialog;
