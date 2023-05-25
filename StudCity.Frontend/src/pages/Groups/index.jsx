import React from 'react';
import Container from '../../components/Container';
import SearchField from '../../UI/fields/SearchField';

const Groups = () => {
	return (
		<Container>
			<header className='py-3 flex justify-between items-center'>
				<h1 className='text-3xl font-bold'>Groups</h1>
				<SearchField containerClassName='w-[400px]' />
			</header>
			<hr />
			<div className='h-[600px] grid place-items-center'>
				<h1 className='text-3xl font-bold text-black/30'>
					This page currently in development...
				</h1>
			</div>
		</Container>
	);
};

export default Groups;
