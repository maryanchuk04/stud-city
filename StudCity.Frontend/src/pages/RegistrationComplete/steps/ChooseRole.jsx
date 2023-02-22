import React from 'react'
import { ROLE_STUDENT, ROLE_TEACHER } from '../../../utils/validators/registerCompleteValidators';

const ChooseRole = ({ role, setRole }) => {
	const roles = [
		{ role: ROLE_STUDENT, style: "bg-roleStudent rounded-l-xl" },
		{ role: ROLE_TEACHER, style: "bg-roleTeacher rounded-r-xl" }
	]

	const backgroundStyles = "relative flex-1 grayscale hover:grayscale-0 hover:flex-[2] bg-center bg-cover bg-no-repeat duration-300 cursor-pointer";
	const labelStyles = "font-extrabold drop-shadow-lg tracking-widest text-white text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
	const activeStyles = "grayscale-0 flex-[2]";

	const roleHandler = (index) => {
		switch (index) {
			case 0: {
				setRole(ROLE_STUDENT);
				return;
			}

			case 1: {
				setRole(ROLE_TEACHER);
				return;
			}
		}
	}

	return (
		<div>
			<h1 className="text-4xl mb-8 text-center">Choose your role</h1>
			<div className="h-[65vh] flex shadow-form rounded-xl">
				{roles.map((_, index) => {
					const isActive = role === _.role;
					return <div
						key={_.role}
						className={`${backgroundStyles} ${_.style} ${isActive && activeStyles}`}
						onClick={() => roleHandler(index)}
					>
						<h1 className={labelStyles}>
							{index === 0 ? "Student" : "Teacher"}
						</h1>
					</div>
				})}
			</div>
		</div >
	)
}

export default ChooseRole