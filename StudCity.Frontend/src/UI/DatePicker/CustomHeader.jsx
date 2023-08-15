import React from 'react';
import { getMonth, getYear } from 'date-fns';
import { MONTH } from '../../utils/constants';
import SelectField from '../fields/SelectField';
import { useTranslation } from 'react-i18next';

const CustomHeader = ({
	date,
	changeYear,
	changeMonth,
	decreaseMonth,
	increaseMonth,
	prevMonthButtonDisabled,
	nextMonthButtonDisabled,
}) => {
	const { t } = useTranslation();
	const buttonStyles = 'border-2 bg-white border-customGray rounded-full px-2 py-1';
	const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

	const translatedMonths = MONTH.map((month) => t(`months.${month.toLowerCase()}`));

	return (
		<div className='gap-2 flex justify-between w-11/12 mx-auto items-center'>
			<button
				onClick={decreaseMonth}
				disabled={prevMonthButtonDisabled}
				className={buttonStyles}
			>
				{'<'}
			</button>
			<SelectField
				className='h-8 text-sm w-24 px-1'
				options={years}
				value={getYear(date)}
				onChange={({ target: { value } }) => changeYear(value)}
			/>
			<SelectField
				className='h-8 text-sm w-24 px-1'
				options={translatedMonths}
				value={translatedMonths[getMonth(date)]}
				onChange={({ target: { value } }) => changeMonth(translatedMonths.indexOf(value))}
			/>
			<button
				onClick={increaseMonth}
				disabled={nextMonthButtonDisabled}
				className={buttonStyles}
			>
				{'>'}
			</button>
		</div>
	);
};

export default CustomHeader;
