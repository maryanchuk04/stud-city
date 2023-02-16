import React from 'react'

const StepItem = ({ label, index }) => {
  return (
	<div className = "flex justify-center flex-col items-center">
		<div className = "bg-primaryAuthentication rounded-circle text-white text-center text-xs w-[20px] h-[20px] p-[2px]">
			{index}
		</div>
		<p className = "w-20 text-center text-primaryAuthentication font-bold">{label}</p>
	</div>
	
  )
}

export default StepItem