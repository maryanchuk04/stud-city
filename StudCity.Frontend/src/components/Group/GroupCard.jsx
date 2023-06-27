import React from 'react'
import GridCard from './GridCard'
import ListCard from './ListCard'

const GroupCard = ({ group, handleClick, viewMode }) => {
	const stylesContainerCardMode = () => {
		switch (viewMode) {
			case "grid":
				return "duration-200 hover:scale-90 h-60";
			case "list":
				return "h-36 mt-5 w-11/12 mx-auto duration-200 hover:scale-105";
			default: return "";
		}
	};

	const renderCardMode = () => {
		switch (viewMode) {
			case "grid":
				return <GridCard group={group} />;
			case "list":
				return <ListCard group={group} />;
			default: return <></>;
		}
	};

	return (
		<div className={`shadow-form flex w-full rounded-xl relative cursor-pointer overflow-hidden ${stylesContainerCardMode()}`}
			onClick={() => handleClick()}
		>
			{renderCardMode()}
		</div>
	)
}

export default GroupCard