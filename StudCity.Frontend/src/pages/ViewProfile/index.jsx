import React, { useState } from "react";
import HeaderViewProfile from "../../components/HeaderViewProfile";
import ElementViewProfile from "../../components/ElementViewProfile";

function ViewProfile() {
	const icons = [ 
			"fa-solid fa-signature",
			"fa-solid fa-envelope",
			"fa-solid fa-cake-candles",
			"fa-solid fa-phone",
			"fa-solid fa-venus-mars",
			"fa-solid fa-person-chalkboard"
		];
	const [aboutInfo] = useState({
		userName: "USER_NAME",
		email: "EMAIL",
		dateOfBirtday: "DATE",
		phoneNumber: "PHONE_NUMBER",
		gender: "GENDER",
		role: "ROLE"
	})
	const userInfo = {
		fullName: "Yaroslav Bihun",
		avatar: "/images/student.jpg",
		backgroundImage: "/images/FlagUkraine.jpeg",
		description: "Cool guy"
	}
	return(
		<div className="w-full h-full bg-elephantBone flex">
			<div className="flex w-9/12 mx-auto flex-col">
				<HeaderViewProfile
					userInfo={userInfo}
				/>
				<div className="flex flex-col">
					<h4 className="w-full text-center font-medium text-4xl text-primaryAuthentication mb-5">About</h4>
					<div className="grid grid-cols-2 w-8/12 mx-auto gap-8">
						{
							Object.keys(aboutInfo).map((key, index) => (
								<ElementViewProfile 
									icon={icons[index]}
									mainText={aboutInfo[key]}
									subText={[key]}
									key={key}
								/>
							))
						}
					</div>
				</div>
			</div>
		</div>
	)
}
export default ViewProfile;