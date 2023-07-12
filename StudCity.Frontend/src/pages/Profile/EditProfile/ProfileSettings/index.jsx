import React from "react";
import SelectField from "../../../../UI/fields/SelectField";
import ToggleContainerText from "../../../../UI/ToggleContainerText";
import Accordion from "../../../../UI/Accordion";

export default function ProfileSettings() {
	return (
		<div className="w-full min-h-fit max-h-full mx-auto flex flex-col gap-5">
			<Accordion isExpanded={true} title="Theme:">
				<ToggleContainerText>Dark mode</ToggleContainerText>
				<ToggleContainerText>Autochange theme</ToggleContainerText>
			</Accordion>
			<Accordion title="Notification:">
				<ToggleContainerText>Show on screen:</ToggleContainerText>
				<ToggleContainerText>Text messages:</ToggleContainerText>
			</Accordion>
			<Accordion title="Language interface:">
				<SelectField
					options={["English", "Ukrainian"]}
					className="w-44"
				/>
			</Accordion>
			<Accordion title="Email:">
				<ToggleContainerText>Send message:</ToggleContainerText>
			</Accordion>
		</div>
	)
}

