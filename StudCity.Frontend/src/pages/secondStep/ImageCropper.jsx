import React, { useState } from "react";
import Cropper from "react-easy-crop";
import Button from "../../UI/Button";
function ImageCropper( { image, onCropDone, onCropCancel }) {
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(2);
	const [croppedArea, setCroppedArea] = useState(null);
	const [aspectRatio] = useState(1 / 1);

	const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
		console.log(croppedAreaPixels)
	}

	return(
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
				
						},
					}}
				/>
				<div className="mx-auto h-fit  mb-5 flex ">
					<Button 
						className="mx-auto w-32"
						onClick={onCropCancel}>
						Cancel
					</Button>
					<Button
						className="mx-auto w-32"
						onClick={ () => onCropDone(croppedArea)}	
					>
						Done
					</Button>
				</div>
		</div>
	)
}

export default ImageCropper;