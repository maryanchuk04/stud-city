import React, { useState } from 'react'
import Tabs from '../Tabs'
import RenderContent from './RenderContent';

const ChatModal = () => {
	const tabs = ["Information", "Members"];
	const [activeTab, setActiveTab] = useState(0);

	const toggleActive = (tabIndex) => {
		setActiveTab(tabIndex);
	}

	return (
		<div className='w-[600px] py-3'>
			<Tabs labels={tabs} setActive={toggleActive} active={activeTab} />
			<div className='my-8 w-11/12 mx-auto h-96'>
				<RenderContent active={activeTab} />
			</div>
		</div>
	)
}

export default ChatModal