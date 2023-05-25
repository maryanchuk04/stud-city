import React from 'react'
import { useSelector } from 'react-redux'
import { selectChat } from '../../features/chatsSlice'
import Avatar from '../../UI/Avatar';

const Information = () => {
	const chat = useSelector(selectChat);
	return (
		<div>
			<div className='w-1/2 mx-auto'>
				<Avatar src={chat.avatar} className='w-32 h-32' />
				<div className='my-5 text-center'>
					<h2 className='text-xl font-bold'>{chat.title}</h2>
					<h3 className='text-lg'>{chat.users.length} members</h3>
				</div>
			</div>
		</div>
	)
}

export default Information