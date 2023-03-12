import React from "react";
import Avatar from "../../UI/Avatar";

function HeaderViewProfile({ userInfo }) {
	
	return(
		<div className="w-full">
			<div className="h-52 w-full overflow-hidden rounded-tl-[60px] mt-6 shadow-form relative">
				<img
					src={userInfo.backgroundImage}
					className="h-full w-full object-cover" alt="" 
				/>
			</div>
			<div className="h-32 w-full -mt-10 flex justify-between">
				<div className="h-fit w-fit relative mx-auto">
					<Avatar
						src={userInfo.avatar}
						className={"w-28 h-28 shadow-form "}
					/>
				</div>
				<div className="w-9/12 h-full flex">
					<div className="flex flex-col w-1/2 h-5/6">
						<h4 className="text-2xl mt-auto font-normal" >
							{userInfo.fullName}
						</h4>
						<h4 className="text-sm font-normal" >
							{userInfo.description}
						</h4>
					</div>
					<div className="flex w-1/2 h-5/6 justify-end">
					</div>
				</div>
			</div>
		</div>
	);
}

export default HeaderViewProfile;