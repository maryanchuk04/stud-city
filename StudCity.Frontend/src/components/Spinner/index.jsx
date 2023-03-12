import React from "react";
import DotLoader from "react-spinners/DotLoader";

function Spinner() {
	return (
		<div className="h-full w-full flex">
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
