import React from "react";

export default function ListCard({ group }) {
	return (
		<div className="w-full mx-auto h-full flex">
			<div className='h-full w-6/12 rounded-t-xl relative'>
				<img src={group.image} alt={group.name} className='h-full w-full' />
				<div className='absolute bg-white h-7 w-7 top-2 right-2 rounded shadow-form flex justify-center items-center'>
					{group.isPrivate
						? <i className="fa-solid fa-lock"></i>
						: <i className="fa-solid fa-lock-open"></i>}
				</div>
			</div>
			<div className='w-6/12 h-full'>
				<div className='flex flex-col p-3'>
					<h1 className='text-2xl font-bold'>{group.name}</h1>
					<p className='text-xl text-gray-400'>Participants: {group.usersCount}</p>
				</div>
			</div>
		</div>
	)
}