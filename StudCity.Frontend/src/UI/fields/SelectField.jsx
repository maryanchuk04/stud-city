import React from 'react'
import Option from './Option'

const SelectField = ({ options, value, placeholder = "", className = "", onChange }) => {
	return (
		<select
			className={`active:border-none w-full static active:border-primaryAuthentication focus:border-primaryAuthentication text-primaryAuthentication my-3 outline-none h-12 px-3 py-1 font-normal rounded-2xl border-solid border-2 placeholder:decoration-[#A0A9AB] text-base border-borderGray ${className}`}
			value={value}
			placeholder={placeholder}
			onChange={onChange}
		>
			{options.map((option) => (
				<Option key={option}>{option}</Option>
			))}
		</select>
	)
}

export default SelectField