import React, { useState } from "react";
import ImageCropper from "./ImageCropper";
import UploadImageInput from "./UploadImageInput";
import Button from "../../UI/Button";
function SecondStep() {
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
		<div className="flex w-[1200px] h-[700px] mx-auto my-auto shadow-md">
			{
				currentPage === "choose-img" ? (
					<div className=" w-[90%] h-full flex flex-col justify-evenly mx-auto">	
						<div className="rounded-full h-[180px] mx-auto w-[180px] overflow-hidden ">
							<img src="/images/defaultAvatar.png" className="w-full h-full " alt="" />
						</div>
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
						<div className=" rounded-full h-[180px] mx-auto w-[180px] overflow-hidden ">
							<img className="w-full h-full object-contain" src={imgAfterCrop} alt="" />
						</div>
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
								className="w-32"
								onClick={() => {
									setCurrentPage("choose-img");
									setImage("");
								}}
							>
								new Image
							</Button>
						</div>
						
					</div>
				)
			}
		</div>
	)
}

export default SecondStep;