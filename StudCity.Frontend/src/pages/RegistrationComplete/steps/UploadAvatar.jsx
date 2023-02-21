import React, { useState } from "react";
import ImageCropper from "../../../components/ImageCropper";
import UploadImageInput from "../../../UI/fields/UploadImageInput"
import Button from "../../../UI/Button";
import Avatar from "../../../UI/Avatar";

function UploadAvatar() {
	const [image, setImage] = useState("");
	const [currentPage, setCurrentPage] = useState("choose-img");
	const [imgAfterCrop, setImgAfterCrop] = useState("");

	const onImageSelected = (selectImg) => {
		setImage(selectImg);
		setCurrentPage("crop-img");
	}

	const onCropDone = (imgCroppedArea) => {
		const canvasEle = document.createElement("canvas");
		canvasEle.width = imgCroppedArea.width;
		canvasEle.height = imgCroppedArea.height;

		const context = canvasEle.getContext("2d");

		const imageObj = new Image();
		imageObj.src = image;
		imageObj.onload = function () {
			context.drawImage(
				imageObj,
				imgCroppedArea.x,
				imgCroppedArea.y,
				imgCroppedArea.width,
				imgCroppedArea.height,
				0,
				0,
				imgCroppedArea.width,
				imgCroppedArea.height

			);

			const dataURL = canvasEle.toDataURL("image/jpeg");

			setImgAfterCrop(dataURL);
			setCurrentPage("img-cropped");
		};
	};

	const onCropCancel = () => {
		setCurrentPage("choose-img");
		setImage("");
	} 

	return (
		<div className="flex w-full h-full flex-col">
			<h1 className="text-4xl text-center">Your Personal Information</h1>
			{
				currentPage === "choose-img" ? (
					<div className=" w-[90%] h-full flex flex-col justify-evenly mx-auto">	
						<Avatar src="/images/defaultAvatar.png" />
						<UploadImageInput  setImage={setImage} onImageSelected={onImageSelected}/>
					</div>
					
				) : currentPage === "crop-img" ? (
					<ImageCropper
						image={image}
						onCropDone={onCropDone}
						onCropCancel={onCropCancel}
					/>
				) : (
					<div className="w-[90%] h-full flex flex-col justify-evenly mx-auto">
						<Avatar src={imgAfterCrop} />
						<div className="w-full flex justify-center">
							<Button
								className="w-32"
								onClick={() => {
									setCurrentPage("crop-img");
								}}
							>
								Crop
							</Button>

							<Button 
								className="w-40"
								onClick={() => {
									setCurrentPage("choose-img");
									setImage("");
								}}
							>
								Another image
							</Button>
						</div>
						
					</div>
				)
			}
		</div>
	)
}

export default UploadAvatar;