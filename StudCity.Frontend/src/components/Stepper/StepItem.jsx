import React from 'react'

const StepItem = ({ label, index, active }) => {
	const baseStepNumberStyles = "grid place-items-center text-white text-center text-sm w-[25px] h-[25px] rounded-full mr-6 border-2 opacity-50";
	return (
		<div className="flex items-center my-2">
			{active === index && (
				<div className={`${baseStepNumberStyles} bg-primaryAuthentication border-primaryGold opacity-100`}>
					{index}
				</div>
			)}
			{active > index && (
				<div className={`${baseStepNumberStyles} bg-primaryGold opacity-100 border-primaryGold`}>
					<span>&#10003;</span>
				</div>
			)}
			{active < index && (
				<div className={`${baseStepNumberStyles} bg-primaryAuthentication`}>
					{index}
				</div>
			)}
			<p className="text-center text-white font-bold">{label}</p>
		</div>

	)
}

export default StepItem