import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentUser, selectUserForHeader } from '../../app/features/user/userSlice'

import FetchSpinner from '../FetchSpinner'
import Header from '../Header'
import Scroller from '../Scroller'
import Sidenav from '../Sidenav'
import Spinner from '../Spinner'

const Layout = ({ children }) => {
	const { loading, data } = useSelector(selectUserForHeader);
	const dispatch = useDispatch();


	useEffect(() => {
		dispatch(fetchCurrentUser());
	}, [])

	return (
		<div className='h-screen'>
			{
				loading ? <Spinner className="flex m-auto h-screen" /> : (
					<div className='h-full'>
						<div className='h-[8%]'>
							<Header user={data} />
						</div>
						<div className='w-full flex h-[92%]'>
							<Sidenav />
							<Scroller>
								{children}
							</Scroller>
						</div>
					</div>
				)
			}
			<FetchSpinner />
		</div >
	)
}

export default Layout