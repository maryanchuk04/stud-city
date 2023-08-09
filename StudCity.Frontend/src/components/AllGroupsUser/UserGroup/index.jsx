import React from "react";
import { NavLink } from "react-router-dom";

export default function UserGroup({ group }) {
	const baseLinkStyles = 'w-full mx-auto h-24 cursor-pointer flex flex-col hover:bg-customGreen rounded-md pl-3'
	return (
		<div className="">
			<NavLink to={`/groups/${group.id}`} className={({ isActive }) => { return isActive ? `${baseLinkStyles} bg-customGreen` : baseLinkStyles }}>
				<div className="flex w-full h-full">
					<div className='h-16 w-16 m-auto rounded-xl overflow-hidden mr-1'>
						<img src={group.image} alt={group.name} className='h-full w-full object-cover' />
					</div>
					<div className='w-9/12 h-full mt-2'>
						<div className='flex flex-col p-1'>
							<h1 className='text-sm font-bold'>{group.name}</h1>
							<p className='text-sm text-gray-400'>Participants: {group.usersCount}</p>
						</div>
					</div>
				</div>
			</NavLink>
			<hr className="w-full my-2" />
		</div>
	)
}