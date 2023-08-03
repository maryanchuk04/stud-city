/* eslint-disable no-unused-vars */
import React, { useRef, useEffect } from 'react';

const Scroller = ({ children, parentRef = null }) => {
	const containerRef = useRef(null);

	useEffect(() => {
		if (!parentRef) {
			const containerElement = containerRef.current;
			const observer = new ResizeObserver((entries) => {
				for (const entry of entries) {
					const hasScrollbar = entry.target.scrollHeight > entry.target.clientHeight;
					if (!hasScrollbar) {
						entry.target.style.paddingRight = '15px';
					} else {
						entry.target.style.paddingRight = '0';
					}
				}
			});

			observer.observe(containerElement);

			return () => {
				observer.unobserve(containerElement);
			};
		}
	}, []);


	return (
		<div ref={parentRef ?? containerRef} className='h-full w-full overflow-y-auto'>
			{children}
		</div >
	)
}

export default Scroller