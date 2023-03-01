import React from "react";
import { REGISTER_COMPLETE_STEPS_COUNT } from "../../utils/constants";

const StepperStrip = ({ activeStep }) => {
	const styles = "w-6 mx-1 h-[10px] rounded";
	return (
		<div className="flex">
			{Array.from({ length: REGISTER_COMPLETE_STEPS_COUNT }, (e, index) => {
				const isActive = activeStep === index + 1;
				return <p
					key={index}
					className={`${styles} ${isActive
						? "bg-primaryAuthentication w-12 scale-110"
						: "bg-stone-200"
						}`}
				></p>
			})}
		</div>
	);
};

export default StepperStrip;
