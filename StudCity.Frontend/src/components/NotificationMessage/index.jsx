import React from "react";
import { useSelector } from "react-redux";
import Avatar from "../../UI/Avatar";
import { useTranslation } from 'react-i18next';
import { selectUserTextMessage } from "../../app/features/userSlice";

export function NotificatinMessage({ content, image, userName }) {
	const isTextMessage = useSelector(selectUserTextMessage);
	const { t } = useTranslation();
	return (
		<div className="flex w-full h-14 bg-elephantBone shadow-md rounded-2xl p-2 mt-2">
			<Avatar className="w-10 h-10 mx-0" src={image} />
			<div className="ml-3 text w-9/12 text-sm">
				<div className="flex justify-between">
					<span className="font-medium">{userName}</span>
					<span className="text-[#969595] text-right">now</span>
				</div>
				<span className="truncate text-[#6d6d6d]">{isTextMessage ? content : t("profile.settings.notification.hiden_text")}</span>
			</div>
		</div>
	)
}