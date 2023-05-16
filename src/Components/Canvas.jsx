import { useEffect, useRef } from "react";
import { useOpenCv } from "opencv-react";

import TransformationForm from "./TransformationForm";
import {
	setCanvasImage,
	transformCanvas,
	getImageRGBAMat,
} from "../Utils/ImageOps";
import "./Canvas.scss";

function Canvas(props) {
	const { uploadedImage } = props;
	const { loaded, cv } = useOpenCv();
	const inputCanvas = useRef(null);
	const outputCanvas = useRef(null);
	let baseImage;
	const outputText = useRef(null);

	const setupCanvases = (image) => {
		setCanvasImage(inputCanvas, image);
		setCanvasImage(outputCanvas, image);
	};

	const applyTransformation = (transformation) =>
		transformCanvas(cv, outputCanvas, transformation, outputText);

	//setup canvases after the first render
	useEffect(() => {
		baseImage = URL.createObjectURL(uploadedImage);
		setupCanvases(baseImage);

		return () => {
			// release memory
			URL.revokeObjectURL(baseImage);
		};
	}, [uploadedImage]);

	return (
		<div className="canvas-container">
			<canvas ref={inputCanvas} />
			<canvas ref={outputCanvas} />
			<textarea ref={outputText} style={{"width": "300px","height": "300px","line-height": "10px"}}></textarea>
			{loaded ? (
				<>
					<h1 className="canvas-container-title">loaded openCV</h1>
					<TransformationForm applyTransformation={applyTransformation} />
				</>
			) : (
				<h1 className="canvas-container-title">Loading OpenCV...</h1>
			)}
		</div>
	);
}

export default Canvas;
