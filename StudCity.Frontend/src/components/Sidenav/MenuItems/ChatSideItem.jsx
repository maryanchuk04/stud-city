import React from 'react'
import SearchField from '../../../UI/fields/SearchField'
import { AllChats } from '../../AllChats'
const ChatSideItem = () => {
	return (
		<div className='w-full h-[90%]'>
			<SearchField />
			<AllChats />
		</div>
	)
}

export default ChatSideItem