import React from "react";
import Scroller from "../Scroller";
import UserGroup from "./UserGroup";

export default function AllGroupsUser({ groups }) {
	return (
		<div className="flex h-5/6 mt-5">
			<Scroller className="scroll-none">
				<div className="flex flex-col">
					{groups.map((item) => (
						<UserGroup group={item} key={item.id} />
					))}
				</div>
			</Scroller>
		</div>
	)
}