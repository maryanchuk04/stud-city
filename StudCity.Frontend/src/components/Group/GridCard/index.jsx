import React from "react";

export default function GridCard({ group }) {
	return (
		<div className="w-full h-full flex-auto">
			<div className='h-1/2 w-full rounded-t-xl relative'>
				<img src={group.image} alt="" className='h-full w-full rounded-t-xl' />
				<div className='absolute bg-white h-7 w-7 top-2 right-2 rounded shadow-form flex justify-center items-center'>
					{group.isPrivate
						? <i className="fa-solid fa-lock"></i>
						: <i className="fa-solid fa-lock-open"></i>}
				</div>
			</div>
			<div className='w-full h-1/2'>
				<div className='flex flex-col p-3'>
					<h1 className='text-lg font-bold'>{group.name}</h1>
					<p className='text-base text-gray-400'>Participants: {group.usersCount}</p>
				</div>
			</div>
		</div>
	)
}