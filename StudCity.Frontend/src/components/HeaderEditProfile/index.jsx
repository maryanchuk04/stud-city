import React, { useState, useEffect } from "react";
import Avatar from "../../UI/Avatar";
import Button from "../../UI/Button";
import UploadAvatar from "../../pages/RegistrationComplete/steps/UploadAvatar";
import CustomDialog from "../../UI/CustomDialog"
import { DEFAULT_AVATAR_URL, DEFAULT_BACKGROUND_URL, SELECT_BACKGROUND_URLS } from "../../utils/constants";

function HeaderEditProfile({ user, setUser, handleSave, handleCancel }) {
	const styleForButton = "mt-auto text-base w-16 h-10 mt-auto mx-0";
	const [avatar, setAvatar] = useState(user.avatar || DEFAULT_AVATAR_URL);
	const [backgroundImage, setBackgroundImage] = useState(user.settings.backgroundImage || DEFAULT_BACKGROUND_URL);
	const [showDialogForAvatar, setShowDialogForAvatar] = useState(false);
	const [showDialogForBackground, setShowDialogForBackground] = useState(false);

	useEffect(() => {
		setUser({
			...user, avatar,
			settings: {
				...user.settings,
				backgroundImage
			}
		});
	}, [avatar, backgroundImage]);

	return (
		<div className="w-full p-2">
			<div className="h-52 w-full overflow-hidden rounded-tl-[60px] mt-6 shadow-form relative">
				<img
					src={backgroundImage}
					className="h-full w-full object-cover" alt=""
				/>
				<Button
					className="absolute bottom-3 right-3 w-12 h-12 border-2 border-customGray-200 bg-white opacity-40 shadow-form"
					onClick={() => setShowDialogForBackground(true)}
				>
					<i className="text-black fa-regular fa-camera"></i>
				</Button>
			</div>
			<div className="h-32 w-full -mt-10 flex justify-between">
				<div className="h-fit w-fit relative mx-auto">
					<Avatar
						src={avatar}
						className={"w-28 h-28 shadow-form "}
					>
						<Button
							className={"absolute bottom-5 -right-2 h-8 w-8 rounded-full z-40 text-base text-center"}
							onClick={() => setShowDialogForAvatar(true)}
						>
							<i className="fa-light fa-pencil mt-1"></i>
						</Button>
					</Avatar>
				</div>
				<div className="w-9/12 h-full flex">
					<div className="flex flex-col w-1/2 h-5/6">
						<h4 className="text-2xl mt-auto font-normal">
							{`${user.firstName}  ${user.lastName}`}
						</h4>
						<h4 className="text-sm font-normal" >
							{user.description || "Update your details"}
						</h4>
					</div>
					<div className="flex w-1/2 h-5/6 justify-end">
						<Button
							className={`${styleForButton} bg-transparent border-2 border-primaryAuthentication text-primaryAuthentication`}
							onClick={handleCancel}
						>
							Cancel
						</Button>

						<Button
							className={`${styleForButton} mx-5 `}
							onClick={handleSave}
						>
							Save
						</Button>
					</div>
				</div>
			</div>
			{
				showDialogForAvatar &&
				<CustomDialog handleClose={setShowDialogForAvatar}>
					<UploadAvatar
						className={"w-[800px] h-[600px]"}
						setAvatar={setAvatar}
						avatar={avatar}
					/>
				</CustomDialog>
			}
			{
				showDialogForBackground &&
				<CustomDialog handleClose={setShowDialogForBackground}>
					<div className="w-[1000px] h-[600px] flex ">
						<div className="w-4/5 h-[90%] overflow-y-auto grid grid-cols-2 m-auto gap-10">
							{
								SELECT_BACKGROUND_URLS.map((element) => (
									<div className="rounded-tl-[60px] overflow-hidden w-full  h-56" key={element}>
										<img
											src={element}
											alt=""
											className="w-full h-full object-cover"
											onClick={() => setBackgroundImage(element)}
										/>
									</div>
								)
								)
							}
						</div>
					</div>
				</CustomDialog>
			}
		</div>
	);
}

export default HeaderEditProfile;