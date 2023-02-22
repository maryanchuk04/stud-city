import React, { useState } from "react";
import ImageCropper from "../../../components/ImageCropper";
import UploadImageInput from "../../../UI/fields/UploadImageInput"
import Avatar from "../../../UI/Avatar";
import { ImageService } from "../../../services/imageService";
import IconButton from "../../../UI/IconButton";
import { DEFAULT_AVATAR_URL } from "../../../utils/constants";

function UploadAvatar({ avatar, setAvatar }) {
	const service = new ImageService();

	const [image, setImage] = useState(avatar === "" ? DEFAULT_AVATAR_URL : avatar);
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
		imageObj.onload = async function () {
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
			setCurrentPage("img-cropped");
			const res = await service.uploadImage(dataURL);
			setAvatar(res)
			setImgAfterCrop(res);
		};
	};

	const onCropCancel = () => {
		setCurrentPage("choose-img");
		setImage(DEFAULT_AVATAR_URL);
		setAvatar("");
	}

	return (
		<div className="flex w-full h-full flex-col">
			<h1 className="text-4xl text-center">Your Personal Information</h1>
			{
				currentPage === "choose-img" ? (
					<div className=" w-[90%] h-full flex flex-col justify-evenly mx-auto">
						<Avatar src={image} className="h-80 w-80" />
						<UploadImageInput setImage={setImage} onImageSelected={onImageSelected} />
					</div>

				) : currentPage === "crop-img" ? (
					<ImageCropper
						image={image}
						onCropDone={onCropDone}
						onCropCancel={onCropCancel}
					/>
				) : (
					<div className="w-[90%] h-full flex flex-col justify-evenly mx-auto">
						<Avatar src={imgAfterCrop} className="h-80 w-80" />
						<div className="w-full flex justify-center gap-10">
							<IconButton
								onClick={() => setCurrentPage("crop-img")}
							>
								<i className="fa-solid fa-crop"></i>
							</IconButton>

							<IconButton
								onClick={onCropCancel}
							>
								<i className="fa-solid fa-trash"></i>
							</IconButton>
						</div>
					</div>
				)
			}
		</div >
	)
}

export default UploadAvatar;