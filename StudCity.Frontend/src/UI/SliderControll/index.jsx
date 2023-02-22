import React from 'react'

const SliderControll = ({ min, max, step, value, onChange, className = "" }) => {
	return (
		<input type={"range"}
			min={min}
			max={max}
			step={step}
			value={value}
			onChange={onChange}
			className={`transparent h-1.5 w-full cursor-pointer appearance-none rounded-lg border-transparent bg-neutral-200 accent-primaryAuthentication ${className}`}
		/>
	)
}

export default SliderControll