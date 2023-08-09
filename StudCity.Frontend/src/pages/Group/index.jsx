import React from "react";
import HeaderChat from "../../components/HeaderChat";
import Post from "./Components/Post";
import Scroller from "../../components/Scroller";

export default function Group() {
	return (
		<div className="w-full h-full bg-[#fbfbf4] flex flex-col">
			<HeaderChat
				title="test"
				users={[1, 2, 4, 3]}
			/>
			<div className="h-[calc(100%-5rem)]">
				<Scroller className="scroll-none">
					<Post
						content="Вітаємо студента першого курсу ФМІ спеціальності 'Комп'ютерні науки' Мельника Володимира із участю у VI Всеукраїнській літній школі з програмування та з почесним III місцем (Ліга 3) на Літньому кубку Закарпаття з програмування - 2023. Бажаємо подальших успіхів та перемог!"
						fullName="TEst"
					/>
				</Scroller>
			</div>
		</div>
	)
}