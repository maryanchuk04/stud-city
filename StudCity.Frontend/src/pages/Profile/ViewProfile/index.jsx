import React, { useEffect, useState } from "react";
import HeaderViewProfile from "../../../components/HeaderViewProfile";
import ElementViewProfile from "../../../components/ElementViewProfile";
import Container from "../../../components/Container";
import { useNavigate, useParams } from "react-router-dom";
import { UserService } from "../../../services/userService";
import { USER_PROFILE_ICONS } from "../../../utils/constants";
import Spinner from "../../../components/Spinner";

function ViewProfile() {
	const service = new UserService();
	const { id } = useParams();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState({
		userName: "USER_NAME",
		email: "EMAIL",
		dateOfBirtday: "DATE",
		phoneNumber: "PHONE_NUMBER",
		gender: "GENDER",
		role: "ROLE"
	})

	const [otherInfo, setOtherInfo] = useState({
		fullName: "Yaroslav Bihun",
		avatar: "/images/student.jpg",
		backgroundImage: "/images/FlagUkraine.jpeg",
		description: "Cool guy"
	});

	useEffect(() => {
		(async () => {
			await fetchUser(id);
		})()
	}, [id])
    
	const fetchUser = async (id) => {
		setLoading(true);
		const data = await service.getUserById(id);
		if (!data) {
			navigate("/not-found");
			return;
		}

		setUser({
			userName: data.userName,
			email: data.email,
			dateOfBirthday: new Date(data.dateOfBirthday).toLocaleDateString(),
			phoneNumber: data.phoneNumber,
			gender: data.gender,
			role: data.role
		});

		setOtherInfo({
			fullName: data.fullName,
			avatar: data.avatar,
			backgroundImage: data.backgroundImage,
			description: "Cool guy"
		})

		setLoading(false);
	}

	return (
		<div className="w-full min-h-screen bg-elephantBone flex m-auto pb-10">
			{
				loading ? <Spinner className="h-auto" /> : (
					<Container className="flex flex-col">
						<HeaderViewProfile
							userInfo={otherInfo}
						/>
						<div className="flex justify-between w-full">
							<div className="w-3/12 mt-10">
								<h4 className="w-full text-start font-medium text-4xl text-primaryAuthentication mb-5">About</h4>
								<div className="grid grid-cols-1 w-full  gap-8">
									{
										Object.keys(user).map((key, index) => (
											<ElementViewProfile
												icon={USER_PROFILE_ICONS[index]}
												mainText={user[key]}
												subText={key.toLocaleUpperCase()}
												key={key}
											/>
										))
									}
								</div>
							</div>
							<div className="w-8/12 mt-10"></div>
						</div>
					</Container>
				)
			}
		</div>
	)
}
export default ViewProfile;