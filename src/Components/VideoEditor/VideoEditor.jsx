import { useEffect, useRef } from "react";
import { useOpenCv } from "opencv-react";

import TransformationSelector from "../TransformationSelector/TransformationSelector";

import { setVideo, transformVideo } from "../../Utils/VideoOps";

import "./VideoEditor.css";

function VideoEditor(props) {
	const { uploadedVideo } = props;
	const { loaded, cv } = useOpenCv();
	const inputVideo = useRef(null);
	const outputText = useRef(null);

	const resetVideo = () => {
		setVideo(inputVideo, uploadedVideo);
	};

	const applyTransformation = (transformation) =>
		transformVideo(cv, inputVideo, transformation, outputText);

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
						<TransformationSelector applyTransformation={applyTransformation} />
						<button className="edit-btn btn-text" onClick={() => resetVideo()}>
							Reset Video
						</button>
					</>
				) : (
					<h1 className="subtitle stroke-text">Loading OpenCV...</h1>
				)}
			</section>
			<section className="canvas-container">
				<div style={{display: "flex", flexDirection: "column"}}>
					<video controls ref={inputVideo}/>
					<textarea ref={outputText} style={{width: 100 + '%', height: 350 + 'px'}}></textarea>
				</div>
				<div style={{display: "flex", flexDirection: "column"}}>
					<canvas id="canvas" controls />
				</div>
			</section>
		</>
	);
}

export default VideoEditor;
