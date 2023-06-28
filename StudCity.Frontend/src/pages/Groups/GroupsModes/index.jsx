import React from "react";
import GroupCard from "../../../components/Group/GroupCard";

export default function GroupsModes({ viewMode, groups }) {

	const stylesViewMode = {
		grid: "grid grid-cols-3 w-full gap-8 p-5",
		list: "flex flex-col mt-5 pb-5",
	};

	return (
		<div className={stylesViewMode[viewMode]}>
			{groups.map((group) => (
				<GroupCard group={group} viewMode={viewMode} key={group?.id} />
			))}
		</div>
	)
}
