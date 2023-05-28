import { useEffect, useRef } from "react";
import { useOpenCv } from "opencv-react";

import TransformationSelector from "../TransformationSelector/TransformationSelector";

import { setVideo, transformVideo } from "../../Utils/VideoOps";

import "./VideoEditor.scss";

function VideoEditor(props) {
	const { uploadedVideo } = props;
	const { loaded, cv } = useOpenCv();
	const inputVideo = useRef(null);
	const outputCanvas = useRef(null);
	const outputText = useRef(null);

	const resetVideo = () => {
		setVideo(inputVideo, uploadedVideo, outputCanvas, outputText);
	};

	const applyTransformation = (transformation) => {
		transformVideo(cv, inputVideo, transformation, outputCanvas, outputText);
	};

	//setup videos after the first render
	useEffect(() => {
		resetVideo();
	}, [uploadedVideo]);

	return (
		<>
			<section className="transformations-container">
				{loaded ? (
					<>
						<h1 className="subtitle stroke-text">
							Loaded openCV - choose a transformation to perform!
						</h1>
						<TransformationSelector
							applyTransformation={applyTransformation}
							disallowedTransformations={[
								"rotateClockwise",
								"rotateCounterClockwise",
							]}
						/>
						<button className="edit-btn btn-text" onClick={() => resetVideo()}>
							Reset Video
						</button>
					</>
				) : (
					<h1 className="subtitle stroke-text">Loading OpenCV...</h1>
				)}
			</section>
			<section className="video-container">
				<div>
					<video controls ref={inputVideo} />
					<canvas ref={outputCanvas} />
				</div>
				<div>
					<textarea
						ref={outputText}
						style={{ width: 100 + "%", height: 350 + "px" }}
					></textarea>
				</div>
			</section>
		</>
	);
}

export default VideoEditor;
