import React, { useRef, useEffect } from 'react';

const ScrollerWithPadding = ({ children, className = '' }) => {
	const containerRef = useRef(null);

	useEffect(() => {
		const containerElement = containerRef.current;
		const observer = new ResizeObserver(handleResize);
		observer.observe(containerElement);

		return () => {
			observer.unobserve(containerElement);
		};
	}, []);
	const handleResize = (entries) => {
		for (const entry of entries) {
			const { target } = entry;
			const hasScrollbar = target.scrollHeight > target.clientHeight;
			target.style.paddingRight = hasScrollbar ? '0' : '15px';
		}
	};

	return (
		<div ref={containerRef} className={`h-full w-full overflow-y-auto ${className}`}>
			{children}
		</div >
	)
}

export default ScrollerWithPadding;