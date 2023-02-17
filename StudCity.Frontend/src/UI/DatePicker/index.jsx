import React from 'react'
import ReactDatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({ className = "", handleChange }) => {
	return (
		<ReactDatePicker
			className={`w-full ${className}`}
			onChange={handleChange}
			inline
		/>
	)
}

export default DatePicker