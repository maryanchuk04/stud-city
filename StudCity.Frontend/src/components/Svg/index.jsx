import React from 'react';
import svgs from '../../assets/svgs';

const Svg = ({ type, className = '' }) => {
	return (
		<img src={svgs[type]} className={className} />
	)
}

export default Svg;