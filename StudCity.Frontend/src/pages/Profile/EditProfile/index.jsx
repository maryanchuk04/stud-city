
import React, { useState } from "react";
import ProfileDetails from "./ProfileDetails";
import ProfileSidebar from "./ProfileSidebar";
import { EDIT_PROFILE_SIDEBAR } from "../../../utils/constants"

function EditProfile() {
	const [menuState, setMenuState] = useState(0);

	const renderSections = () => {
		switch (menuState) {
			case 0:
				return <ProfileDetails />
			default:
				return <h1>In progress...</h1>
		}
	}

	return (
		<div className="w-full h-screen flex flex-col bg-elephantBone">
			<div className="w-10/12 h-full flex flex-col mx-auto pb-11">
				<div className="h-24 w-full border-b-2 border-[#D1D7D4] flex items-center">
					<h4 className="text-3xl font-medium" >{EDIT_PROFILE_SIDEBAR[menuState].title}</h4>
				</div>
				<div className="h-5/6 flex w-full">
					<div className="w-3/12 h-full ">
						<ProfileSidebar items={EDIT_PROFILE_SIDEBAR} menuState={menuState} setMenuState={setMenuState} />
					</div>
					<div className="w-9/12 h-full flex flex-col">
						{renderSections()}
					</div>
				</div>
			</div>
		</div>
	)
}

export default EditProfile;