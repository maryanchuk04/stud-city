import React from "react";
import { Link } from "react-router-dom";
import Button from "../../UI/Button";

function NotFound() {
	return(
		<div className={`w-full bg-elephantBone h-screen flex relative overflow-hidden`}>
				<div className={`absolute -left-[5%] top-3/4 w-[400px] h-[400px] bg-primaryAuthentication rounded-full`}></div>
				<div className={`absolute -right-[2%] top-1/3 w-[150px] h-[150px] bg-primaryAuthentication rounded-full`}></div>
				<div className={`absolute -left-[100px] top-2/4 w-[200px] h-[200px] bg-yellowGreen rounded-full`}></div>
				<div className={`absolute -right-[12%] bottom-[70%] w-[350px] h-[350px] bg-yellowGreen rounded-full`}></div>
				<span className={`absolute font-black top-[35%] font-serif left-1/2 -translate-x-2/4 -translate-y-2/4 text-yellowGreen opacity-70  text-[350px]`}>Error</span>
				<div className={`m-auto font-black text-[250px] h-4/5 text-primaryAuthentication z-10 flex flex-col`}>
					<div className={`flex h-4/5 items-end`}>
						<span className="">4</span>
						<span className="">0</span>
						<span className="rotate-180">4</span>
					</div>
					<Link className=" mx-auto mb-100px h-1/5  flex" to="/">
						<Button className={`shadow-md px-4 text-elephantBone font-bold tracking-[5px] hover:bg-elephantBone hover:text-primaryAuthentication duration-500`} >Back to home</Button>
					</Link>
				</div>
		</div>);
}

export default NotFound;
