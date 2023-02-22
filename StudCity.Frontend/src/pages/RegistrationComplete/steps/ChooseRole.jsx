import React from 'react'

const ChooseRole = ({ role, setRole }) => {
	const rolesStyles = ["bg-roleStudent rounded-l-xl", "bg-roleTeacher rounded-r-xl"];
	const backgroundStyles = "relative flex-1 grayscale hover:grayscale-0 hover:flex-[2] bg-center bg-cover bg-no-repeat duration-300 cursor-pointer";
	const labelStyles = "font-extrabold drop-shadow-lg tracking-widest text-white text-5xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
	const activeStyles = "grayscale-0 flex-[2]";

	return (
		<div>
			<h1 className="text-4xl mb-8 text-center">Choose your role</h1>
			<div className="h-[65vh] flex shadow-form rounded-xl">
				{rolesStyles.map((_, index) => (
					<div
						key={_}
						className={`${backgroundStyles} ${_} ${role === index + 1 && activeStyles}`}
						onClick={() => setRole(index + 1)}
					>
						<h1 className={labelStyles}>
							{index === 0 ? "Student" : "Teacher"}
						</h1>
					</div>
				))}
			</div>
		</div >
	)
}

export default ChooseRole