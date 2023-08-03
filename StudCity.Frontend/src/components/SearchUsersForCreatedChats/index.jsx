import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "../Tabs";
import { LABELS_USERS_GROUPS } from "../../utils/constants";
import Scroller from "../Scroller";
import { selectDataUsersFound, getUsersSearch } from "../../app/features/userSlice";
import TextField from "../../UI/fields/TextField";
import Spinner from "../Spinner";
import Avatar from "../../UI/Avatar";

export default function UserGroupSearch({ setSelectedUsers, selectedUsers }) {
	const [tabIndex, setTabIndex] = useState(0);
	const dispatch = useDispatch();
	const [users, setUsers] = useState([]);
	const [searchData, setSearchData] = useState('');
	const [totalItemsCount, setTotalItemsCount] = useState(0);
	const { data, loading } = useSelector(selectDataUsersFound);
	const [indexPage, setIndexPage] = useState(1);
	const containerRef = useRef(null);

	useEffect(() => {
		if (containerRef.current) {
			containerRef.current.addEventListener('scroll', handleScroll);
		}
		return () => {
			if (containerRef.current) {
				containerRef.current.removeEventListener('scroll', handleScroll);
			}
		};

	}, [containerRef.current, loading])

	useEffect(() => {

		if (data.items?.length > 0) {
			setUsers(prev => [...prev, ...data.items])
		}
		if (data.items?.length > 0 && indexPage === 1) {
			setUsers(data.items)
			setTotalItemsCount(data.pageViewModel.totalItemsCount)
		}
		if (data?.items?.length === 0) {
			setUsers([])
		}
	}, [data.items])

	useEffect(() => {
		dispatch(getUsersSearch({
			page: 1,
			pageSize: 10,
			searchWord: searchData
		}))
	}, [searchData])

	useEffect(() => {

		if (indexPage > 1 && (totalItemsCount / (10 * (indexPage - 1))) > 1) {
			dispatch(getUsersSearch({
				page: indexPage,
				pageSize: 10,
				searchWord: searchData
			}))
		}
	}, [indexPage])

	const handleSearch = ({ target }) => {
		setSearchData(target.value);
		setUsers([])
		setIndexPage(1)
	}

	const handleScroll = () => {
		if (containerRef.current) {
			if ((containerRef.current.clientHeight + containerRef.current.scrollTop > containerRef.current.scrollHeight - 1) && !loading) {
				setIndexPage((prev) => prev + 1);
			}
		}
	};

	const handleClick = (user) => {
		setSelectedUsers(prev => {
			if (prev.some(item => item.id === user.id)) {
				return prev.filter(elem => elem.id !== user.id)
			}
			return [...prev, user]
		})
	}

	return (
		<div className="h-full w-full mx-auto flex flex-col">
			<div className="w-full mx-auto text-xl">
				<Tabs
					active={tabIndex}
					setActive={setTabIndex}
					labels={LABELS_USERS_GROUPS}>
				</Tabs>
			</div>
			<div className="h-5/6 w-full">
				<div className="h-1/6 flex">
					<TextField
						className="w-9/12 my-2 h-5/6"
						placeholder='Search'
						onChange={handleSearch}
					/>
					<div className="w-2/12 ml-auto mr-0">
						<SelectedUsers selectedUsers={selectedUsers} />
					</div>
				</div>
				<div className="h-[320px] max-h-5/6 w-full flex pt-2" >
					<Scroller parentRef={containerRef}>
						{indexPage === 1 && loading
							? <Spinner />
							: (
								users?.length > 0
									? <div className="h-fit">
										{users?.map((elem) => (
											<User
												user={elem}
												key={elem.id}
												onClick={handleClick}
												className={selectedUsers?.some(item => item.id === elem.id) ? 'bg-customGreen' : ''}
											/>
										))}
										{indexPage > 1 && loading && (<div className="h-24 flex w-full">
											<Spinner />
										</div>)}
									</div>
									: <div className="w-full h-full flex"><p className="m-auto">Nothing found</p></div>
							)
						}
					</Scroller>
				</div>
			</div>
		</div>
	)
}

function User({ user, onClick, className }) {
	return (
		<div
			className={`w-[97%] border rounded-md my-2 p-3 cursor-pointer h-20 flex last:my-0 last:mt-2 first:mt-2 hover:bg-customGreen duration-200 ${className}`}
			onClick={() => onClick(user)}
		>
			<div className="flex items-center">
				<Avatar className="w-16 h-16" src={user?.avatar} />
			</div>
			<div className="ml-5 flex flex-col justify-center">
				<p className="font-bold">{user?.fullName}</p>
				<p className="text-gray-500">{user?.lastSeen || "last seen 5 minutes ago"}</p>
			</div>
		</div>
	)
}

function SelectedUsers({ selectedUsers }) {
	return (
		<div className="w-full h-full relative cursor-pointer">
			{
				selectedUsers?.map((elem, index) => {
					if (index === 0) {
						return <Avatar className="w-7 h-7 absolute -translate-x-2/4 -translate-y-2/4 top-1/2 left-0 z-10" key={elem?.id || index} src={elem.avatar} />
					} else if (index === 1) {
						return <Avatar className="w-7 -ml-3 h-7 absolute -translate-x-2/4 -translate-y-2/4 top-1/2 left-6 z-20" key={elem?.id || index} src={elem.avatar} />
					}
					else if (index === 2) {
						return <Avatar className="w-7 -ml-3 h-7 absolute -translate-x-2/4 -translate-y-2/4 top-1/2 left-9 z-30" key={elem?.id || index} src={elem.avatar} />
					}
					else return null;
				})
			}
			{selectedUsers?.length > 3 && <span className="absolute -translate-x-2/4 -translate-y-2/4 top-1/2 left-14 z-10 text-gray-700">+{selectedUsers?.length - 3}</span>}
		</div>
	)
}