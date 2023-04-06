import React from 'react'
import TextField from './TextField'

const SearchField = ({ className = "", containerClassName = "", search }) => {
	return (
		<div className={`relative min-w-min ${containerClassName}`}>
			<TextField placeholder="Search..." className={`h-10 pr-12  ${className}`} onChange={search} />
			<i className="fa-solid fa-magnifying-glass absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 z-10 hover:bg-[#9f969643] cursor-pointer duration-300 p-2 rounded-full"></i>
		</div>
	)
}

export default SearchField