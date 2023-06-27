import React from 'react'
import TextField from './TextField'

const SearchField = ({ className = "", containerClassName = "", search, placeholder = '' }) => {
	return (
		<div className={`relative flex min-w-min ${containerClassName}`}>
			<TextField placeholder={placeholder} className={`mx-0 my-0 ${className}`} onChange={search} />
			<i className="fa-solid fa-magnifying-glass absolute top-1/2 right-0 transform -translate-y-1/2 z-10 hover:bg-[#9f969643] cursor-pointer duration-300 p-2 rounded-full mr-2"></i>
		</div>
	)
}

export default SearchField