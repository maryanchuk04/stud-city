
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileDetails from "./ProfileDetails";
import ProfileSidebar from "./ProfileSidebar";
import { EDIT_PROFILE_SIDEBAR } from "../../../utils/constants"
import { fetchCurrentUser, selectCurrentUser } from "../../../app/features/user/userSlice";
import Spinner from "../../../components/Spinner";
import Container from "../../../components/Container";

function EditProfile() {
	const { loading, data } = useSelector(selectCurrentUser);
	const dispatch = useDispatch();

	const [menuState, setMenuState] = useState(0);

	useEffect(() => {
		dispatch(fetchCurrentUser());
	}, [])

	const renderSections = () => {
		switch (menuState) {
			case 0:
				return <ProfileDetails user={data} />
			default:
				return <h1>In progress...</h1>
		}
	}

	return (
		<div className="w-full h-screen flex flex-col bg-elephantBone">
			{
				loading ? <Spinner /> : (
					<Container className="h-full flex flex-col mx-auto">
						<div className="h-24 w-full border-b-2 border-[#D1D7D4] flex items-center">
							<h4 className="text-3xl font-medium" >{EDIT_PROFILE_SIDEBAR[menuState].title}</h4>
						</div>
						<div className="h-5/6 flex w-full">
							<div className="w-3/12 h-full ">
								<ProfileSidebar items={EDIT_PROFILE_SIDEBAR} menuState={menuState} setMenuState={setMenuState} />
							</div>
							<div className="w-9/12 h-full flex flex-col overflow-y-auto">
								{renderSections()}
							</div>
						</div>
					</Container>
				)
			}
		</div>
	)
}

export default EditProfile;