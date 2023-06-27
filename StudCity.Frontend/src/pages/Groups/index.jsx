import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Container';
import SearchField from '../../UI/fields/SearchField';
import SelectField from '../../UI/fields/SelectField';
import Scroller from '../../components/Scroller';
import { VIEW_MODE_ICONS, GROUP_MOCK } from '../../utils/constants';
import { selectViewMode, changeViewMode } from '../../app/features/groupsSlice';
import GroupsModes from './GroupsModes';
const Groups = () => {
	const options = ["Default", "Descending of popularity", "Ascending of popularity"];
	const dispatch = useDispatch();
	const viewMode = useSelector(selectViewMode);
	const handleChangeViewMode = (value) => {
		dispatch(changeViewMode(value));
	}

	return (
		<Container className='h-full'>
			<header className='py-3 flex justify-between items-center'>
				<h1 className='text-3xl font-bold'>Groups</h1>
				<div className="mr-0 ml-auto flex">
					<SearchField containerClassName='w-60 h-fit my-3 mr-5' placeholder='Search...' className='h-12' />
					<SelectField className='w-60 my-3 px-3 py-1 mr-5' options={options} />
					{
						VIEW_MODE_ICONS.map((item, index) => (
							<div
								className={viewMode === item.name ? "text-2xl mx-1 my-auto cursor-pointer w-12 h-12 flex bg-customGreen hover:shadow rounded-lg duration-300" : "text-2xl mx-1 cursor-pointer w-12 h-12 flex hover:bg-customGreen my-auto  hover:shadow rounded-lg duration-300"}
								key={index}
								onClick={() => handleChangeViewMode(item.name)}
							>
								<i className={`${item.icon} m-auto`}></i>
							</div>
						))
					}
				</div>
			</header>
			<hr />
			<div className="flex w-full h-5/6">
				<div className="w-9/12 h-full">
					<Scroller>
						<GroupsModes viewMode={viewMode} groups={GROUP_MOCK}></GroupsModes>
					</Scroller>
				</div>
				<div className="w-3/12 h-full border"></div>
			</div>
		</Container>
	);
};

export default Groups;
