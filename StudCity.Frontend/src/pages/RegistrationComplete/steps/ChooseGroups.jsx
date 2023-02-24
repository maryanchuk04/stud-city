import React, { useEffect, useState } from 'react'
import { GroupsService } from '../../../services/groupsService'
import Spinner from '../../../components/Spinner';
import GroupCard from '../../../components/Group/GroupCard';
import IconButton from '../../../UI/IconButton';

const ChooseGroups = ({ groups, setGroups }) => {
	const service = new GroupsService();

	const [allGroups, setAllGroups] = useState([]);

	useEffect(() => {
		fetchGroups();
	}, [])

	const handleClick = (id) => {
		if (groups.includes(id)) {
			setGroups(groups.filter(group => group !== id));
			return;
		}
		setGroups([...groups, id]);
	}

	const fetchGroups = () => {
		setAllGroups([]);
		setTimeout(() => setAllGroups(service.getGroups()), 2000);
	}

	return (
		<div className='h-full flex flex-col justify-center items-center'>
			<h1 className="text-4xl text-center mb-6">Choose your first groups</h1>
			{allGroups.length ? <div className='flex flex-wrap gap-2 items-center justify-center'>
				{allGroups.map((group) => {
					const isActive = groups.includes(group.id);
					return <GroupCard key={group.id}
						group={group}
						isActive={isActive}
						handleClick={handleClick}
					/>
				})
				}
				<div className='flex flex-col justify-center items-center'>
					{groups.length !== 0 && <h2 className='my-2 text-xl'>Selected: {groups.length}</h2>}
					<IconButton className='my-2' onClick={fetchGroups}>
						<i className="fa-solid fa-rotate-right"></i>
					</IconButton>
				</div>
			</div> : <Spinner />}
		</div>
	)
}

export default ChooseGroups