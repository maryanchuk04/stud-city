import React, { useState } from 'react';
import Button from '../Button';

export default function Accordion({ children, title, isExpanded = false }) {
	const [expanded, setExpanded] = useState(isExpanded);

	const handleClick = () => {
		setExpanded(!expanded);
	}

	return (
		<div className="border-2 border-customGray py-2 px-5 rounded-lg first:mt-5 last:mb-5 cursor-pointer" onClick={handleClick}>
			<HeaderAccordion setExpanded={setExpanded} expanded={expanded}>{title}</HeaderAccordion>
			{expanded && children}
		</div>
	)
}

const HeaderAccordion = ({ children, className = '', expanded, setExpanded }) => {

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