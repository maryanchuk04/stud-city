import React from "react";

function Button({ children, className = "", disabled = false, ...custom }) {
	return (
		<button
			className={`rounded-2xl bg-primaryAuthentication disabled:cursor-not-allowed disabled:opacity-50 text-primaryWhite  mx-auto mt-3 h-12  font-normal text-xl w-full ${className}`}
			disabled={disabled}
			type="submit"
			{...custom}
		>
			{children}
		</button>
	);
}

export default Button;
