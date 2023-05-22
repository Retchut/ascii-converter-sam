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
	let baseImage;
	const outputText = useRef(null);

	const resetCanvas = () => {
		setCanvasImage(inputCanvas, baseImage);
	};

	const applyTransformation = (transformation) =>
		transformCanvas(cv, inputCanvas, transformation, outputText);

	//setup canvases after the first render
	useEffect(() => {
		baseImage = URL.createObjectURL(uploadedImage);
		resetCanvas();

		return () => {
			// release memory
			URL.revokeObjectURL(baseImage);
		};
	}, [uploadedImage]);

	return (
		<div className="canvas-container">
			<canvas ref={inputCanvas} />
			<textarea
				ref={outputText}
				style={{ width: "300px", height: "300px", "line-height": "10px" }}
			></textarea>
			{loaded ? (
				<>
					<h1 className="canvas-container-title">loaded openCV</h1>
					<TransformationForm applyTransformation={applyTransformation} />
					<button onClick={() => resetCanvas()}>Reset Image</button>
				</>
			) : (
				<h1 className="canvas-container-title">Loading OpenCV...</h1>
			)}
		</div>
	);
}

export default Canvas;
