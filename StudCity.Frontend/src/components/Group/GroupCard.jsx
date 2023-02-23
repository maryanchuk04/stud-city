import React from 'react'

const GroupCard = ({ group, isActive, handleClick }) => {
	return (
		<div className='shadow-form flex-auto w-[24%] h-60 rounded-xl relative duration-200 cursor-pointer hover:scale-90'
			onClick={() => handleClick(group.id)}
		>
			<div className="w-full h-60">
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
			{isActive && <div className='rounded-xl absolute bg-[#453e354d] top-0 left-0 w-full h-full flex'>
				<i className="m-auto z-20 text-white text-6xl fa-solid fa-badge-check"></i>
			</div>}
		</div>
	)
}

export default GroupCard