import React from "react";

function Button({ children, className = "", disabled = false, onClick = null }) {
	return (
		<button
			className={`rounded-2xl bg-primaryAuthentication disabled:cursor-not-allowed text-primaryWhite mt-3 h-16 w-1/1 font-normal text-xl ${className}`}
			disabled={disabled}
			type="submit"
			onClick={onClick}
		>
			{children}
		</button>
	);
}

export default Button;
