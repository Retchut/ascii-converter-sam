import {
	grayscaleTransformation,
	rotateClockWise,
	rotateCounterClockWise,
	getImageASCII,
} from "./ImageTransformations";

function setVideo(videoRef, video) {
	// load image
	videoRef.current.src = video;
}

function transformVideo(openCV, videoRef, transformation, textRef) {
	console.log("transform video");
}

export { transformVideo, setVideo };
