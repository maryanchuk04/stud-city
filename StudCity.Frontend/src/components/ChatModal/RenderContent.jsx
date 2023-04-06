import React from 'react'
import Information from './Information'
import Members from './Members'

const RenderContent = ({ active }) => {
	switch (active) {
		case 0:
			return <Information />
		case 1:
			return <Members />
	}
}

export default RenderContent