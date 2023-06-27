import React from "react";
import GroupCard from "../../../components/Group/GroupCard";

export default function GroupsModes({ viewMode, groups }) {
	const stylesViewMode = () => {
		switch (viewMode) {
			case "grid":
				return "grid grid-cols-3 w-full gap-8 p-5";
			case "list":
				return "flex flex-col mt-5";
			default: return "";
		}
	}

	return (
		<div className={stylesViewMode()}>
			{groups.map((group) => (
				<GroupCard group={group} viewMode={viewMode} key={group?.id} />
			))}
		</div>
	)
}
