import React from 'react'
import SearchField from '../../../UI/fields/SearchField';
import { GROUP_MOCK } from '../../../utils/constants';
import AllGroupsUser from '../../AllGroupsUser';

const GroupsSideItem = () => {
	return (
		<div className='w-full h-[90%]'>
			<SearchField placeholder='Search...' />
			<AllGroupsUser groups={GROUP_MOCK} />
		</div>
	)
}

export default GroupsSideItem