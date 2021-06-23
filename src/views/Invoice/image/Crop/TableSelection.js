import React, { useState, useCallback, useRef, useEffect } from "react";
import { Row, Col, Button } from "reactstrap";
import ReactCrop from "react-image-crop";
// import axiosAPI from "../../../../components/axiosApi";

import "react-image-crop/dist/ReactCrop.css";

// function generateDownload(canvas, crop) {
// 	if (!crop || !canvas) {
// 		return;
// 	}

// 	canvas.toBlob(
// 		(blob) => {
// 			const previewUrl = window.URL.createObjectURL(blob);

// 			const anchor = document.createElement("a");
// 			anchor.download = "cropPreview.png";
// 			anchor.href = URL.createObjectURL(blob);
// 			anchor.click();

// 			window.URL.revokeObjectURL(previewUrl);
// 		},
// 		"image/png",
// 		1
// 	);
// }

const generateDownload = (
	// canvas,
	crop
) => {
	// axiosAPI
	// 	.post("", crop)
	// 	.then((response) => {
	// 		console.log(response);
	// 	})
	// 	.catch((error) => {
	// 		console.log(error);
	// 	});

	console.log(crop);
};

export default function TableSelection(props) {
	// const [upImg, setUpImg] = useState();
	const imgRef = useRef(null);
	const previewCanvasRef = useRef(null);
	const [crop, setCrop] = useState({
		unit: "px",
		width: 400,
		height: 500,
		x: 25,
		y: 25,
	});
	const [completedCrop, setCompletedCrop] = useState(null);

	// const onSelectFile = (e) => {
	// 	if (e.target.files && e.target.files.length > 0) {
	// 		const reader = new FileReader();
	// 		reader.addEventListener("load", () => setUpImg(reader.result));
	// 		reader.readAsDataURL(e.target.files[0]);
	// 	}
	// };

	const onLoad = useCallback((img) => {
		imgRef.current = img;
	}, []);

	useEffect(() => {
		if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
			return;
		}

		const image = imgRef.current;
		const canvas = previewCanvasRef.current;
		const crop = completedCrop;

		const scaleX = image.naturalWidth / image.width;
		const scaleY = image.naturalHeight / image.height;

		const ctx = canvas.getContext("2d");
		const pixelRatio = window.devicePixelRatio;

		canvas.width = crop.width * pixelRatio;
		canvas.height = crop.height * pixelRatio;

		ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
		ctx.imageSmoothingQuality = "high";

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height
		);
	}, [completedCrop]);

	return (
		<div>
			{/* <div>
				<input type="file" accept="image/*" onChange={onSelectFile} />
			</div> */}
			<Row>
				<Col>
					<ReactCrop
						// src={upImg}
						src={props.img}
						onImageLoaded={onLoad}
						crop={crop}
						onChange={(c) => setCrop(c)}
						onComplete={(c) => setCompletedCrop(c)}
					/>
				</Col>
				<Col>
					<h4>Preview</h4>
					<div>
						<canvas
							ref={previewCanvasRef}
							// Rounding is important so the canvas width and height matches/is a multiple for sharpness.
							style={{
								width: Math.round(completedCrop?.width ?? 0),
								height: Math.round(completedCrop?.height ?? 0),
							}}
							// style={{
							// 	width: completedCrop?.width ?? 0,
							// 	height: completedCrop?.height ?? 0,
							// }}
						/>
					</div>

					<Button
						disabled={
							!completedCrop?.width || !completedCrop?.height
						}
						onClick={() =>
							generateDownload(
								// previewCanvasRef.current,
								completedCrop
							)
						}
					>
						Send Coordinates
					</Button>
				</Col>
			</Row>
		</div>
	);
}
