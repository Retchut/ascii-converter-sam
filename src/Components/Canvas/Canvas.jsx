import { useEffect, useRef } from "react";
import { useOpenCv } from "opencv-react";

import TransformationSelector from "../TransformationSelector/TransformationSelector";
import {
	setCanvasImage,
	transformCanvas,
	getImageRGBAMat,
} from "../../Utils/ImageOps";
import "./Canvas.scss";

function Canvas(props) {
	const { uploadedImage } = props;
	const { loaded, cv } = useOpenCv();
	const inputCanvas = useRef(null);
	const outputText = useRef(null);

	const resetCanvas = () => {
		setCanvasImage(inputCanvas, uploadedImage);
	};

	const applyTransformation = (transformation) =>
		transformCanvas(cv, inputCanvas, transformation, outputText);

	//setup canvases after the first render
	useEffect(() => {
		resetCanvas();
	}, [uploadedImage]);

	return (
		<>
			<section className="transformations-container">
				{loaded ? (
					<>
						<h1 className="subtitle stroke-text">
							Loaded openCV - choose a transformation to perform!
						</h1>
						<TransformationSelector applyTransformation={applyTransformation} />
						<button className="edit-btn btn-text" onClick={() => resetCanvas()}>
							Reset Image
						</button>
					</>
				) : (
					<h1 className="subtitle stroke-text">Loading OpenCV...</h1>
				)}
			</section>
			<section className="canvas-container">
				<canvas ref={inputCanvas} />
				<textarea ref={outputText}></textarea>
			</section>
		</>
	);
}

export default Canvas;
