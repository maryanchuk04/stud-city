import React from "react";
import ToggleButton from "../ToggleButton";

export default function ToggleContainerText({ children, onChange, isToggle }) {
	return (
		<div className="w-full h-12 items-center flex justify-between">
			<span className="text-xl font-medium mr-4">{children}</span>
			<ToggleButton onChange={onChange} isToggle={isToggle} />
		</div>
	)
}