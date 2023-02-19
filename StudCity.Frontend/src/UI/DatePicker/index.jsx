/* eslint-disable react/display-name */
import React, { useRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePicker = ({ className = "", handleChange, value }) => {
	const ref = useRef();

	const ExampleCustomInput = React.forwardRef(({ value, ...props }, ref) => (
		<input
			{...props}
			ref={ref}
			placeholder="Date of birth:"
			value={value}
			className="active:border-none w-full static active:border-primaryAuthentication focus:border-primaryAuthentication text-primaryAuthentication my-3 outline-none h-12 px-3 py-1 font-normal rounded-2xl border-solid border-2 placeholder:decoration-[#A0A9AB] text-base border-[#D1D7D4]"
		/>
	));

	return (
		<ReactDatePicker
			className={`w-full ${className}`}
			onChange={handleChange}
			value={value}
			placeholderText="Date of bithday: "
			customInput={<ExampleCustomInput ref={ref} />}
		/>
	);
};
export default DatePicker;
