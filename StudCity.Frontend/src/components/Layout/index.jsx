import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentUser, selectUserForHeader } from '../../app/features/userSlice'
import { selectSpinnerState } from '../../app/features/fetchSpinnerSlice'
import FetchSpinner from '../FetchSpinner'
import Header from '../Header'
import Scroller from '../Scroller'
import Sidenav from '../Sidenav'
import Spinner from '../Spinner'
import { fetchUserChats } from '../../app/features/chatsSlice'
import { NotificatinContainer } from '../NotificationContainer'

const Layout = ({ children }) => {
	const { loading, data } = useSelector(selectUserForHeader);
	const isOpen = useSelector(selectSpinnerState);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchUserChats());
		dispatch(fetchCurrentUser());
	}, [])

	return (
		<div className='h-screen'>
			<div className='h-full'>
				<div className='h-20'>
					<Header user={data} />
				</div>
				<div className='w-full flex h-[calc(100%-5rem)]'>
					<Sidenav />
					{
						loading ? <Spinner className="flex m-auto h-full" /> : (
							<Scroller>
								{children}
							</Scroller>
						)
					}
				</div>
			</div>
			{isOpen && <FetchSpinner />}
			<NotificatinContainer />
		</div >
	)
}

export default Layout