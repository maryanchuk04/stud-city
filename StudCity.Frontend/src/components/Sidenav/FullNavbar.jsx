import React, { useState } from 'react';
import Switch from '../Switch';
import MenuComponents from './MenuItems';
import Button from '../../UI/Button';
import CustomDialog from '../../UI/CustomDialog'
import CreateChatModal from './CreateChatModal';

const FullNavbar = ({ active, activeName }) => {
	const [handleOpenModel, setHandleOpenModel] = useState(false);

	const handleClick = () => {
		setHandleOpenModel(true);
	}

	const handleClose = (isClose) => {
		setHandleOpenModel(isClose);
	}

	return (
		<div className='w-80 h-full border-r-2'>
			<div className='w-5/6 h-[95%] mx-auto mt-4'>
				<div className="flex justify-between">
					<h1 className='text-2xl font-semibold items-center'>{activeName}</h1>
					{active === 1 &&
						<Button
							className='mx-0 my-0 bg-transparent rounded-full hover:bg-customGreen w-10 h-10 mt-0'
							onClick={handleClick}
						>
							<i className="fa-solid fa-plus-large text-black"></i>
						</Button>}
				</div>
				<Switch active={active} components={MenuComponents} />
			</div>
			{
				handleOpenModel &&
				<CustomDialog
					withCloseButton={false}
				>
					<CreateChatModal handleClose={handleClose} />
				</CustomDialog>
			}
		</div>
	);
};

export default FullNavbar;
