import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UploadAvatar from '../../../pages/RegistrationComplete/steps/UploadAvatar';
import Button from '../../../UI/Button';
import Avatar from '../../../UI/Avatar';
import { DEFAULT_AVATAR_URL } from '../../../utils/constants';
import CustomDialog from '../../../UI/CustomDialog';
import { createChat } from '../../../app/features/chatsSlice';
import TextField from '../../../UI/fields/TextField';
import SearchUsersForCreatedChats from '../../SearchUsersForCreatedChats';

export default function CreateChatModal({ handleClose }) {
	const [showDialogForAvatar, setShowDialogForAvatar] = useState(false);
	const [avatar, setAvatar] = useState(DEFAULT_AVATAR_URL);
	const [nameGroup, setNameGroup] = useState('');
	const [isDisabledCreateButton, setIsDisabledCreateButton] = useState(false);
	const [errorMessageWhenButtonDisabled, setErrorMessageWhenButtonDisabled] = useState('');
	const [idsUsers, setIdsUsers] = useState([]);
	const [selectedUsers, setSelectedUsers] = useState([]);
	const dispatch = useDispatch();
	const handleCloseUploadAvatar = (closed) => {
		setShowDialogForAvatar(closed)
	}

	const handleClick = () => {
		dispatch(createChat({
			usersIds: idsUsers,
			title: nameGroup,
			imageUrl: avatar
		}))
	}

	useEffect(() => {
		console.log(avatar)
	}, [avatar])
	const handleChangeName = ({ target }) => {
		setNameGroup(target.value);
	}

	useEffect(() => {
		handleDisabled()
	}, [nameGroup, selectedUsers])

	useEffect(() => {
		if (selectedUsers?.length > 0) {
			setIdsUsers(selectedUsers.map(obj => obj.id))
		}
	}, [selectedUsers])

	const handleDisabled = () => {
		setIsDisabledCreateButton(false);
		if (nameGroup.length < 3) {
			setIsDisabledCreateButton(true);
			setErrorMessageWhenButtonDisabled("The name of the group is at least 3 characters long")
		}
		if (selectedUsers.length < 2) {
			setIsDisabledCreateButton(true);
			setErrorMessageWhenButtonDisabled("At least two users are selected")
		}
		if (nameGroup.length < 3 && selectedUsers.length < 2) {
			setIsDisabledCreateButton(true);
			setErrorMessageWhenButtonDisabled("The name of the group is at least 3 characters long and at least two users are selected")
		}
	}

	return <div className='w-[550px] h-[700px] relative'>
		{
			showDialogForAvatar ?
				<CustomDialog
					className='!bg-white !h-full flex items-center justify-center'
					handleClose={handleCloseUploadAvatar}
				>
					<UploadAvatar
						avatar={avatar}
						setAvatar={setAvatar}
						className='my-auto w-[450px] h-[550px] left-0 top-0'
					/>
				</CustomDialog>
				:
				<div className="w-11/12 mx-auto h-full flex flex-col">
					<div className="flex mt-5">
						<div className="h-fit w-fit relative ml-7">
							<Avatar
								src={avatar}
								className={"w-24 h-24 shadow-lg"}
							>
								<Button
									className={"absolute bottom-5 -right-2 h-8 w-8 rounded-full z-40 text-base text-center"}
									onClick={() => setShowDialogForAvatar(true)}
								>
									<i className="fa-light fa-pencil mt-1"></i>
								</Button>
							</Avatar>
						</div>
						<div className="flex flex-col ml-10 justify-center">
							<span className='text-lg font-bold ml-1'>Name chat group:</span>
							<TextField
								placeholder="Name"
								onChange={handleChangeName}
							/>
						</div>
					</div>
					<hr className='w-full mx-auto h-[0.7px] border-0 bg-gray-300 mt-3' />
					<div className="h-4/6 w-full">
						<SearchUsersForCreatedChats
							selectedUsers={selectedUsers}
							setSelectedUsers={setSelectedUsers}
						/>
					</div>
					<hr className='w-full mx-auto h-[0.7px] border-0 bg-gray-300 mt-3' />
					<div className="flex h-1/6 w-full justify-end items-center">
						{isDisabledCreateButton && <span className='text-sm text-red-600 w-6/12'>{errorMessageWhenButtonDisabled}</span>}
						<div className="">
							<Button
								className='bg-white mx-0 mt-0 py-2 px-3 border-primaryAuthentication border mr-5 w-fit text-primaryAuthentication'
								onClick={handleClose}
							>
								Cancel
							</Button>
							<Button
								className='w-fit py-2 px-3 mx-0 mt-0 mr-5'
								onClick={() => { handleClick(); handleClose(); }}
								disabled={isDisabledCreateButton}
							>
								Create
							</Button>
						</div>
					</div>
				</div>
		}
	</div>;
}