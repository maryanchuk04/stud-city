import React, { useState } from 'react'
import Avatar from "../../../../UI/Avatar";
import Button from "../../../../UI/Button";
import TextField from "../../../../UI/fields/TextField";
import SelectField from "../../../../UI/fields/SelectField";
import ValidateTextField from "../../../../UI/fields/ValidateTextField";
import UploadAvatar from "../../../RegistrationComplete/steps/UploadAvatar";
import { DEFAULT_AVATAR_URL, DEFAULT_BACKGROUND_URL, SELECT_BACKGROUND_URLS } from "../../../../utils/constants";
import DatePicker from "../../../../UI/DatePicker";
import CustomDialog from "../../../../UI/CustomDialog";
import { phoneNumberValidator } from '../../../../utils/validators/validators';

const ProfileDetails = () => {
	const styleForButton = "mt-auto text-base w-16 h-10 mt-auto mx-0";
	const containerWithInputs = "flex justify-between w-full mt-10 items-center";
	const inputBlock = "w-1/2 flex justify-between items-center";
	const spanWithInputsBlocks = "ml-16 text-left text-base";
	const textFieldStyle = "w-60 h-10";

	const [avatar, setAvatar] = useState(DEFAULT_AVATAR_URL);
	const [backgroundImage, setBackgroundImage] = useState(DEFAULT_BACKGROUND_URL);
	const [showDialogForAvatar, setShowDialogForAvatar] = useState(false);
	const [showDialogForBackground, setShowDialogForBackground] = useState(false);

	return (
		<div className="">
			<div className="h-52 w-full overflow-hidden rounded-tl-[60px] mt-6 shadow-form relative">
				<img
					src={backgroundImage}
					className="h-full w-full object-cover" alt="" />
				<Button
					className="absolute bottom-3 right-3 w-12 h-12 border-2 border-gray-200 bg-white opacity-40 shadow-form"
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
						<h4 className="text-2xl mt-auto font-normal" >Profile</h4>
						<h4 className="text-sm font-normal" >Update your photo and personal details</h4>
					</div>
					<div className="flex w-1/2 h-5/6 justify-end">
						<Button
							className={`${styleForButton} bg-transparent border-2 border-primaryAuthentication text-primaryAuthentication`}
						>
							Cancel
						</Button>
						<Button
							className={`${styleForButton} mx-5 `}
						>
							Save
						</Button>
					</div>
				</div>
			</div>
			<div className={containerWithInputs}>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>First name</span>
					<TextField
						className={textFieldStyle}
						placeholder="Input first name"
					/>
				</div>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>Last name</span>
					<TextField
						className={textFieldStyle}
						placeholder="Input last name"
					/>
				</div>
			</div>
			<div className={containerWithInputs}>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>User name</span>
					<TextField
						className={textFieldStyle}
						placeholder="Input user name"
					/>
				</div>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>Gender</span>
					<SelectField
						className={textFieldStyle}
						options={["Male", "Female", "Other"]}
					/>
				</div>
			</div>
			<div className={containerWithInputs}>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>Phone number</span>
					<ValidateTextField
						className={textFieldStyle}
						withErrorMessage={false}
						validator={phoneNumberValidator}
						placeholder="Input your phone"
					/>
				</div>
				<div className={inputBlock}>
					<span className={spanWithInputsBlocks}>Birthday</span>
					<div className="w-60">
						<DatePicker
							className={textFieldStyle}
						/>
					</div>
				</div>
			</div>
			{
				showDialogForAvatar
				&&
				<CustomDialog handleClose={setShowDialogForAvatar}>
					<UploadAvatar
						className={"w-[800px] h-[600px]"}
						setAvatar={setAvatar}
					/>
				</CustomDialog>
			}
			{
				showDialogForBackground
				&&
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
		</div >
	)
}

export default ProfileDetails