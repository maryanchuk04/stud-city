import React from 'react'
import { Link } from 'react-router-dom';
import Avatar from '../../UI/Avatar';

const UserPreview = ({ user }) => {
	const { fullName, id, image, userName } = user;

	return (
		<Link to={`/profile/${id}`} className='w-full rounded-xl duration-200 p-4 flex h-24 hover:bg-primaryGold/20'>
			<div className='w-fit mr-12'>
				<Avatar src={image} className='w-16 h-16' />
			</div>
			<div className='h-full flex flex-col justify-between'>
				<h1 className='text-xl font-bold'>{fullName}</h1>
				<h2>@{userName}</h2>
			</div>
		</Link>
	)
}

export default UserPreview