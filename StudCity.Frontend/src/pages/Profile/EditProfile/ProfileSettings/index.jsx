import React from "react";
import ToggleContainerText from "../../../../UI/ToggleContainerText";
import SelectField from "../../../../UI/fields/SelectField";

export default function ProfileSettings() {
	return (

		<div className="w-10/12 min-h-fit max-h-full mx-auto ml-6 grid grid-cols-2 gap-5">
			<ChildSettings>
				<TitleSettings>Theme:</TitleSettings>
				<ToggleContainerText>Dark mode</ToggleContainerText>
				<ToggleContainerText>Autochange theme</ToggleContainerText>
			</ChildSettings>
			<ChildSettings>
				<TitleSettings>Notification:</TitleSettings>
				<ToggleContainerText>Show on screen:</ToggleContainerText>
				<ToggleContainerText>Text messages:</ToggleContainerText>
			</ChildSettings>
			<ChildSettings>
				<TitleSettings>Language interface:</TitleSettings>
				<SelectField
					options={["English", "Ukrainian"]}
					className="w-44"
				/>
			</ChildSettings>
			<ChildSettings>
				<TitleSettings>Email:</TitleSettings>
				<ToggleContainerText>Send message:</ToggleContainerText>
			</ChildSettings>
		</div>
	)
}

const TitleSettings = ({ children, className = '' }) => {
	return (
		<h3 className={`text-2xl font-bold ${className}`}>{children}</h3>
	)
}

const ChildSettings = ({ children }) => {
	return (
		<div className="w-11/12 flex h-fit flex-col my-6">
			{children}
		</div>
	)
}
