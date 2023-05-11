import { useEffect, useRef } from "react";
import { useOpenCv } from "opencv-react";

import TransformationForm from "./TransformationForm";
import { setCanvasImage, transformCanvas } from "../Utils/ImageOps";

import LoadedIMG from "../Assets/sample.png";

function Canvas() {
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
					<h1>loaded openCV</h1>
					<TransformationForm applyTransformation={applyTransformation} />
				</>
			) : (
				<h1>Loading OpenCV...</h1>
			)}
		</div>
	);
}

export default Canvas;
