import React from "react";
import Button from "../Button";
function CustomDialog({ className = "", children, handleClose }) {
	return (
		<div className={`absolute z-50 w-full top-0 left-0 h-screen bg-[#00000050] ${className}`}>
			<div className="bg-white z-50 w-fit h-fit -translate-x-2/4 -translate-y-2/4 left-1/2 top-1/2 absolute rounded-3xl">
				{children}
				<Button
					className="absolute w-10 h-10 top-5 right-5"
					onClick={() => handleClose(false)}
				>
					<span>&#10008;</span>
				</Button>
			</div>
		</div>
	);
}

export default CustomDialog;
