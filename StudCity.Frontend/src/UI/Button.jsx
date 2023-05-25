import React from "react";

function Button({ children, className = "", disabled = false, type = 'primary', ...custom }) {
	const primary = 'bg-primaryAuthentication text-white';
	const secondary = "border-2 border-primaryGold text-primaryGold"

	const typeClassNames = () => {
		switch (type) {
			case 'primary':
				return primary;
			case 'secondary':
				return secondary;
		}
	}

	return (
		<button
			className={`rounded-2xl disabled:cursor-not-allowed disabled:opacity-50 mx-auto mt-3 h-12 font-normal text-xl w-full ${typeClassNames()} ${className}`}
			disabled={disabled}
			type="submit"
			{...custom}
		>
			{children}
		</button>
	);
}

export default Button;
