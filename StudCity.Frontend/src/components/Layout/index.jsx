import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentUser, selectUserForHeader } from '../../app/features/userSlice'
import { selectSpinnerState } from '../../app/features/fetchSpinnerSlice'
import FetchSpinner from '../FetchSpinner'
import Header from '../Header'
import Scroller from '../Scroller'
import Sidenav from '../Sidenav'
import Spinner from '../Spinner'
import { fetchUserChats, selectUserChats } from '../../app/features/chatsSlice'
import { HubService } from '../../services/hubService'

const Layout = ({ children }) => {
	const { loading, data } = useSelector(selectUserForHeader);
	const isOpen = useSelector(selectSpinnerState);
	const rooms = useSelector(selectUserChats);
	const dispatch = useDispatch();
	const hub = new HubService();

	useEffect(() => {
		dispatch(fetchUserChats());
		dispatch(fetchCurrentUser());
	}, [])

	useEffect(() => {
		if (rooms.length > 0) {
			hub.startConnection().then(() => {
				hub.connectToUserRooms(rooms.map((room) => room.id));
			})

		}
	}, [rooms])

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
		</div >
	)
}

export default Layout