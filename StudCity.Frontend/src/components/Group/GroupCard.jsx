import React from 'react'
import GridCard from './GridCard'
import ListCard from './ListCard'

const GroupCard = ({ group, handleClick, viewMode }) => {

	const stylesContainerCardMode = {
		grid: "duration-200 hover:scale-90 h-60",
		list: "h-36 mt-5 w-11/12 mx-auto duration-200 hover:scale-105",
	}

	const renderCardMode = {
		grid: <GridCard group={group} />,
		list: <ListCard group={group} />,
	}

	return (
		<div className={`shadow-form flex w-full rounded-xl relative cursor-pointer overflow-hidden ${stylesContainerCardMode[viewMode]}`}
			onClick={() => handleClick()}
		>
			{renderCardMode[viewMode]}
		</div>
	)
}

export default GroupCard