import React from "react";
import DotLoader from "react-spinners/DotLoader";

function Spinner({ className }) {
	return (
		<div className={`h-full w-full flex ${className}`}>
			<DotLoader
				size={70}
				aria-label="Loading Spinner"
				data-testid="loader"
				className="m-auto"
				color="#453e35"
			/>
		</div>
	);
}

export default Spinner;
