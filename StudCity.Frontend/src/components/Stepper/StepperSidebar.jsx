import React from "react";
import StepDescription from "./StepDescription";
import StepItem from "./StepItem";

const StepperSidebar = ({ labels, activeStep }) => {
	return (
		<div className="flex flex-col  bg-primaryAuthentication h-full p-12 m-0">
			<div className="my-5">
				<h1 className="text-white text-3xl font-black">
					Create your account
				</h1>
			</div>
			<StepDescription
				description={labels[activeStep - 1].description}
				activeStep={activeStep}
			/>
			<div className="flex flex-col justify-evenly my-5">
				{labels.map((label, index) => (
					<div key = {`${label}-${index}`}>
						<StepItem
							label={label.title}
							index={index + 1}
							active={activeStep}
						/>
						{index + 1 < activeStep ? (
							<hr className="border-0 border-l-2 h-16 ml-3 border-primaryGold opacity-50 " />
						) : (
							index !== 4 && (
								<hr className="border-0 border-l-2 h-16 ml-3 border-white opacity-50" />
							)
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default StepperSidebar;
