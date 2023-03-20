import React from 'react'
import { BounceLoader } from 'react-spinners';


const FetchSpinner = () => {
	return (
		<div className='absolute z-10 h-screen w-screen bg-black opacity-50 top-0 left-0 grid place-items-center'>
			<BounceLoader color='white' size={300} />
		</div>
	)
}

export default FetchSpinner