import { transformCanvas } from "./ImageOps";
import {
	grayscaleTransformation,
	rotateClockWise,
	rotateCounterClockWise,
	getImageASCII,
} from "./ImageTransformations";

let timeout = null;

function setVideo(videoRef, video, canvasRef, textareaRef) {
	if (timeout) clearTimeout(timeout);
	videoRef.current.src = video;

	canvasRef.current.style.display = "none";
	textareaRef.current.style.display = "none";
}

function transformVideo(openCV, videoRef, transformation, canvasRef, textRef) {
	const FPS = 35;
	const video = videoRef.current;
	const canvas = canvasRef.current;

	// change canvas tag style
	canvas.style.display = "block";
	textRef.current.style.display = "block";
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;

	setTimeout(
		() => processVideo(FPS, openCV, transformation, canvasRef, textRef, video),
		0
	);
}

function processVideo(FPS, openCV, transformation, canvasRef, textRef, video) {
	const canvas = canvasRef.current;
	const context = canvas.getContext("2d");

	let begin = Date.now();

	// draw frame in canvas
	context.drawImage(video, 0, 0);

	transformCanvas(openCV, canvasRef, transformation, textRef);

	// maintain framerate
	let delay = 1000 / FPS - (Date.now() - begin);
	timeout = setTimeout(
		() => processVideo(FPS, openCV, transformation, canvasRef, textRef, video),
		delay
	);
}

export { transformVideo, setVideo };
