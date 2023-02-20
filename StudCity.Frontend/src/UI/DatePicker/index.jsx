/* eslint-disable react/display-name */
import React, { useRef } from "react";
import ReactDatePicker from "react-datepicker";
import TextField from "../fields/TextField";
import CustomHeader from "./CustomHeader";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({ className = "", onChange, value }) => {
	const ref = useRef();

	const ExampleCustomInput = React.forwardRef(({ value, ...props }, ref) => (
		<TextField
			{...props}
			ref={ref}
			value={value}
		/>
	));

	return (
		<ReactDatePicker
			className={`w-full ${className}`}
			onChange={onChange}
			value={value}
			placeholderText="Date of bithday: "
			customInput={<ExampleCustomInput ref={ref} />}
			renderCustomHeader={({
				date,
				changeYear,
				changeMonth,
				decreaseMonth,
				increaseMonth,
				prevMonthButtonDisabled,
				nextMonthButtonDisabled,
			}) => (
				<CustomHeader
					date={date}
					changeYear={changeYear}
					changeMonth={changeMonth}
					decreaseMonth={decreaseMonth}
					increaseMonth={increaseMonth}
					prevMonthButtonDisabled={prevMonthButtonDisabled}
					nextMonthButtonDisabled={nextMonthButtonDisabled}
				/>
			)}
		/>
	);
};
export default DatePicker;
