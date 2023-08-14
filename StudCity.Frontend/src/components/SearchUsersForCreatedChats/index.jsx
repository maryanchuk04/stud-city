import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "../Tabs";
import { LABELS_USERS_GROUPS } from "../../utils/constants";
import { selectDataUsersFound, getUsersSearch } from "../../app/features/userSlice";
import TextField from "../../UI/fields/TextField";
import Avatar from "../../UI/Avatar";
import ScrollerPagination from "../ScrollerPagination";

export default function UserGroupSearch({ setSelectedUsers, selectedUsers }) {
	const [tabIndex, setTabIndex] = useState(0);
	const dispatch = useDispatch();
	const [searchData, setSearchData] = useState('');
	const { data, loading } = useSelector(selectDataUsersFound);

	const handleSearch = ({ target }) => {
		setSearchData(target.value);
	}
	const handleDispatch = (indexPage, searchData) => {
		dispatch(getUsersSearch({
			page: indexPage,
			searchWord: searchData
		}))
	}

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
					<ScrollerPagination
						loading={loading}
						data={data}
						handleDispatch={handleDispatch}
						handleClick={handleClick}
						searchData={searchData}
						ItemComponent={User}
						selectedItems={selectedUsers}
					/>
				</div>
			</div>
		</div>
	)
}

function User({ item, onClick, className = '' }) {
	return (
		<div
			className={`w-[97%] border rounded-md my-2 p-3 cursor-pointer h-20 flex last:my-0 last:mt-2 first:mt-2 hover:bg-customGreen duration-200 ${className}`}
			onClick={() => onClick(item)}
		>
			<div className="flex items-center">
				<Avatar className="w-16 h-16" src={item?.avatar} />
			</div>
			<div className="ml-5 flex flex-col justify-center">
				<p className="font-bold">{item?.fullName}</p>
				<p className="text-gray-500">{item?.lastSeen || "last seen 5 minutes ago"}</p>
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