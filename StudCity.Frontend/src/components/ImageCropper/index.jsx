import React, { useState } from "react";
import Cropper from "react-easy-crop";
import Button from "../../UI/Button";
import SliderControll from "../../UI/SliderControll";

function ImageCropper({ image, onCropDone, onCropCancel }) {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedArea, setCroppedArea] = useState(null);
	const [aspectRatio] = useState(1 / 1);

	const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	}

	return (
		<div className="flex relative w-full h-full justify-end items-end ">
			<Cropper
				image={image}
				aspect={aspectRatio}
				crop={crop}
				zoom={zoom}
				onCropChange={setCrop}
				onZoomChange={setZoom}
				onCropComplete={onCropComplete}
				style={{
					containerStyle: {
						width: "400px",
						height: "400px",
						backgroundColor: "#fff",
						margin: "auto",
						bottom: "100px"
					},
				}}
			/>

			<div className="mx-auto h-fit gap-5  mb-10 flex flex-wrap">
				<SliderControll
					className="flex-auto w-full"
					min={1}
					max={3}
					step={0.1}
					value={zoom}
					onChange={(e) => setZoom(e.target.value)}
				/>
				<Button
					className="mx-auto w-20 rounded-full"
					onClick={onCropCancel}
				>
					<span>&#10008;</span>
				</Button>
				<Button
					className="mx-auto w-20 rounded-full"
					onClick={() => onCropDone(croppedArea)}
				>
					<span>&#10003;</span>
				</Button>
			</div>
		</div>
	)
}

export default ImageCropper;