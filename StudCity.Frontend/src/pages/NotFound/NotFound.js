import React from "react";
import { Link } from "react-router-dom";
import Button from "../../UI/Button";

function NotFound() {
	const dark = "#453e35";
	const light = "#b4b45d";
	const background = "#FFFFF0";
	return(
		<div className={`w-full bg-[${background}] h-screen flex  relative overflow-hidden`}>
				<div className={`absolute left-[-5%] top-3/4 w-[400px] h-[400px] bg-[${dark}] rounded-[50%] `}></div>
				<div className={`absolute right-[-2%] top-1/3 w-[150px] h-[150px] bg-[${dark}] rounded-[50%] `}></div>
				<div className={`absolute left-[-100px] top-2/4 w-[200px] h-[200px] bg-[${light}] rounded-[50%] `}></div>
				<div className={`absolute right-[-12%] bottom-[70%] w-[350px] h-[350px] bg-[${light}] rounded-[50%] `}></div>
				<span className={`absolute font-black top-[35%] font-serif left-1/2 translate-x-[-50%] translate-y-[-50%] text-[${light}] opacity-70  text-[350px]`}>Error</span>
				<div className={` m-auto font-black text-[250px] h-4/5 text-${dark} z-10 flex flex-col`}>
					<div className={`flex h-4/5 items-end`}>
						<span className="">4</span>
						<span className="">0</span>
						<span className="rotate-180">4</span>
					</div>
					<Link className=" mx-auto mb-100px h-1/5  flex" to="/">
						<Button className={`shadow-md px-4 text-[${background}] font-bold tracking-[5px] hover:bg-[${background}] hover:text-[${dark}] duration-500 `} >Back to home</Button>
					</Link>
				</div>
		</div>);
}

export default NotFound;
