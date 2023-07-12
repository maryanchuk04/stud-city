import React, { useState } from "react";
import SelectField from "../../../../UI/fields/SelectField";
import ToggleContainerText from "../../../../UI/ToggleContainerText";
import Button from "../../../../UI/Button";

export default function ProfileSettings() {
	return (
		<div className="w-full min-h-fit max-h-full mx-auto flex flex-col gap-5">
			<Accord isExpanded={true}>
				<HeaderAccord>Theme:</HeaderAccord>
				<ToggleContainerText>Dark mode</ToggleContainerText>
				<ToggleContainerText>Autochange theme</ToggleContainerText>
			</Accord>
			<Accord>
				<HeaderAccord>Notification:</HeaderAccord>
				<ToggleContainerText>Show on screen:</ToggleContainerText>
				<ToggleContainerText>Text messages:</ToggleContainerText>
			</Accord>
			<Accord>
				<HeaderAccord>Language interface:</HeaderAccord>
				<SelectField
					options={["English", "Ukrainian"]}
					className="w-44"
				/>
			</Accord>
			<Accord>
				<HeaderAccord>Email:</HeaderAccord>
				<ToggleContainerText>Send message:</ToggleContainerText>
			</Accord>
		</div>
	)
}

const HeaderAccord = ({ children, className = '', expanded, setExpanded }) => {

	const handleClick = () => {
		setExpanded(!expanded);
	}

	return (
		<div className={`flex w-full justify-between`}>
			<h3 className={`text-2xl flex items-center font-bold ${className}`}>{children}</h3>
			<Button onClick={handleClick} className="w-fit bg-transparent text-black mx-0 my-0 mt-0">
				{expanded ?
					<i className="fa-solid fa-angle-up"></i>
					: <i className="fa-solid fa-angle-down"></i>
				}
			</Button>
		</div>
	)
}


const Accord = ({ children, isExpanded = false }) => {
	const [expanded, setExpanded] = useState(isExpanded);

	return (
		<div className="border-2 border-customGray py-2 px-5 rounded-lg first:mt-5 last:mb-5">
			{expanded ?
				React.Children.map(children, (child, index) => {
					if (index === 0) {
						return React.cloneElement(child, { setExpanded: setExpanded, expanded: expanded });
					}
					return child;
				})
				: (
					React.cloneElement(React.Children.toArray(children)[0], { setExpanded: setExpanded, expanded: expanded })
				)
			}
		</div>
	)
};


