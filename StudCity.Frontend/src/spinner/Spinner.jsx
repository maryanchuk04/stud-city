import React from 'react';
import DotLoader from "react-spinners/DotLoader";

function Spinner() {
	return (
		<div className="mx-auto my-0">
			<DotLoader
				size={70}
				aria-label="Loading Spinner"
				data-testid="loader"
			/>
		</div>
	)
}

export default Spinner