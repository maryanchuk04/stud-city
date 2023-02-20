import React from "react";
import { getMonth, getYear } from "date-fns";
import { months } from "../../utils/constants";
import SelectField from "../fields/SelectField";

const CustomHeader = ({
	date,
	changeYear,
	changeMonth,
	decreaseMonth,
	increaseMonth,
	prevMonthButtonDisabled,
	nextMonthButtonDisabled,
}) => {
	const buttonStyles = "border-2 bg-white border-[#D1D7D4] rounded-full px-2 py-1";
	const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
	return (
		<div className=" gap-2 flex justify-between w-11/12 mx-auto items-center">
			<button onClick={decreaseMonth} disabled={prevMonthButtonDisabled} className={buttonStyles}>
				{"<"}
			</button>
			<SelectField
				className="h-8 text-sm w-24 px-1"
				options={years}
				value={getYear(date)}
				onChange={({ target: { value } }) => changeYear(value)}
			/>
			<SelectField
				className="h-8 text-sm w-24 px-1"
				options={months}
				value={months[getMonth(date)]}
				onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
			/>
			<button onClick={increaseMonth} disabled={nextMonthButtonDisabled} className={buttonStyles}>
				{">"}
			</button>
		</div>
	);
}

export default CustomHeader;