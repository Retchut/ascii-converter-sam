import { useEffect, useRef } from "react";
import { useOpenCv } from "opencv-react";

import TransformationForm from "./TransformationForm";
import {
	setCanvasImage,
	transformCanvas,
	getImageRGBAMat,
} from "../Utils/ImageOps";
import "./Canvas.scss";

// import LoadedIMG from "../Assets/sample1.png";
import LoadedIMG from "../Assets/sample3.png";
// import LoadedIMG from "../Assets/4pixel.png";

function Canvas(props) {
	const { loaded, cv } = useOpenCv();
	const inputCanvas = useRef(null);
	const outputCanvas = useRef(null);

	const setupCanvases = () => {
		setCanvasImage(inputCanvas, LoadedIMG); // TODO: change this to receive the uploaded image
		setCanvasImage(outputCanvas, LoadedIMG); // TODO: change this to receive the uploaded image
	};

	const applyTransformation = (transformation) =>
		transformCanvas(cv, outputCanvas, transformation);

	//setup canvases after the first render
	useEffect(() => setupCanvases(), []);

	return (
		<div className="canvas-container">
			<canvas ref={inputCanvas} />
			<canvas ref={outputCanvas} />
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
