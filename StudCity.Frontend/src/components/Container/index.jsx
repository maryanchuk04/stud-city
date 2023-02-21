import React from 'react'

const Container = ({ children, className = "" }) => {
  return (
	<div className = {`mx-auto w-5/6 min-w-[380px] ${className}`}>
		{ children }
	</div>
  )
}

export default Container