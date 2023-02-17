import React from 'react'

const StepItem = ({ label, index, active }) => {
	return (
		<div className="flex justify-center flex-col items-center">
			{active === index && (
				<div className={`grid place-items-center bg-primaryAuthentication border-[#b0a464] border-2 rounded-full text-white text-center text-sm w-[25px] h-[25px]`}>
					{index}
				</div>
			)}
			{active > index && (
				<div className={`grid place-items-center bg-[#b0a464] rounded-full text-white text-center text-sm  w-[25px] h-[25px]`}>
					<span>&#10003;</span>
				</div>
			)}
			{active < index && (
				<div className={`grid place-items-center bg-primaryAuthentication rounded-full text-white text-center text-sm w-[25px] h-[25px]`}>
					{index}
				</div>
			)}
			<p className="w-20 text-center text-primaryAuthentication font-bold">{label}</p>
		</div>

	)
}

export default StepItem