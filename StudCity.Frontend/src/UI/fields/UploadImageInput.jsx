import React, { useRef } from "react";
import Button from "../Button";

function UploadImageInput({ onImageSelected, buttonStyle, containerStyle, children }) {
	const inputRef = useRef();

	const handleOnChange = (event) => {
		if (event.target.files && event.target.files.length > 0) {
			const reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.onload = function () {
				onImageSelected(reader.result);
			}
		}
	};

	const onChooseImg = () => {
		inputRef.current.click();
	};

	return (
		<div className={`w-full flex ${containerStyle}`}>
			<input
				type="file"
				accept="image/*"
				ref={inputRef}
				onChange={handleOnChange}
				className="hidden"
			/>
			<Button
				className={`mx-auto w-40 ${buttonStyle}`}
				onClick={onChooseImg}>
				{children}
			</Button>
		</div>
	)
}

export default UploadImageInput;