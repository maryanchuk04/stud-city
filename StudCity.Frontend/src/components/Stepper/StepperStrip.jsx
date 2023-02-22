import React from "react";

const StepperStrip = ({ activeStep }) => {
	const styles = "w-6 mx-1 h-[10px] rounded";
	return (
		<div className="flex">
			{Array.from({ length: 5 }, (e, index) => (
				<p
					key={index}
					className={`${styles} ${activeStep === index + 1
						? "bg-primaryAuthentication w-12 scale-110"
						: "bg-stone-200"
						}`}
				></p>
			))}
		</div>
	);
};

export default StepperStrip;
