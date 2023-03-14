import React from 'react'
import { useSelector } from 'react-redux'
import { BounceLoader } from 'react-spinners';
import { selectSpinnerState } from '../../app/features/fetchSpinnerSlice'

const FetchSpinner = () => {
	const isOpen = useSelector(selectSpinnerState);

	return isOpen && (
		<div className='absolute z-10 h-screen w-screen bg-black opacity-50 top-0 left-0 grid place-items-center'>
			<BounceLoader color='white' size={300} />
		</div>
	)
}

export default FetchSpinner