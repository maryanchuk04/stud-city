import React from 'react'
import GridCard from './GridCard'
import ListCard from './ListCard'

const GroupCard = ({ group, handleClick, isActive, viewMode }) => {

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
			onClick={() => handleClick(group.id)}
		>
			{renderCardMode[viewMode]}
			{isActive && <div className='rounded-xl absolute bg-[#453e354d] top-0 left-0 w-full h-full flex'>
				<i className="m-auto z-20 text-white text-6xl fa-solid fa-badge-check"></i>
			</div>}
		</div>
	)
}

export default GroupCard