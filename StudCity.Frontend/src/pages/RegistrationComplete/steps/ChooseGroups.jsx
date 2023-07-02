import React, { useEffect, useState } from 'react'
import { GroupsService } from '../../../services/groupsService'
import Spinner from '../../../components/Spinner';
import GroupCard from '../../../components/Group/GroupCard';
import IconButton from '../../../UI/IconButton';
import Scroller from '../../../components/Scroller';

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
		console.log(id)
		setGroups([...groups, id]);
	}

	const fetchGroups = () => {
		setAllGroups([]);
		setTimeout(() => setAllGroups(service.getGroups()), 2000);
	}

	return (
		<div className='h-full flex flex-col justify-center items-center'>
			<h1 className="text-4xl text-center mb-6">Choose your first groups</h1>
			<Scroller>
				{allGroups.length ? <div className='w-11/12 mx-auto py-6 grid grid-cols-2 gap-5 place-items-center'>
					{allGroups.map((group) => {
						const isActive = groups.includes(group.id);
						return <GroupCard key={group.id}
							group={group}
							isActive={isActive}
							handleClick={handleClick}
							viewMode={"grid"}
						/>
					})
					}
					<div className='flex flex-col justify-center items-center'>
						<IconButton className='my-2' onClick={fetchGroups}>
							<i className="fa-solid fa-rotate-right"></i>
						</IconButton>
					</div>
				</div> : <Spinner />}
			</Scroller>
		</div>
	)
}

export default ChooseGroups