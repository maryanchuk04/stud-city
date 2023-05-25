import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectChat } from '../../app/features/chatsSlice'
import UserPreview from '../UserPreview';
import SearchField from '../../UI/fields/SearchField';
import Button from '../../UI/Button';

const Members = () => {
	const { users } = useSelector(selectChat);
	const [data, setData] = useState(users);

	const handleSearch = ({ target }) => {
		setData(users.filter(x => x.fullName.toLowerCase().includes(target.value.toLowerCase())
			|| x.userName.toLowerCase().includes(target.value.toLowerCase())));
	}

	return (
		<div className='h-full'>
			<div className='h-[15%]'>
				<div className='w-full h-full flex flex-wrap'>
					<SearchField containerClassName='w-3/4' search={handleSearch} />
					<Button type='secondary' className='h-10 w-32 hover:bg-primaryGold duration-300 hover:text-white'>Add member</Button>
				</div>
			</div>
			<div className='h-[85%] overflow-y-auto'>
				{
					data.map((user) => (
						<UserPreview key={user.id} user={user} />
					))
				}
			</div>
		</div>
	)
}

export default Members