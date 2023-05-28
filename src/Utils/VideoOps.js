import { transformCanvas } from "./ImageOps";
import {
	grayscaleTransformation,
	rotateClockWise,
	rotateCounterClockWise,
	getImageASCII,
} from "./ImageTransformations";

let timeout = null;

function setVideo(videoRef, video, canvasRef, textareaRef) {
	videoRef.current.src = video;

	canvasRef.current.style.display = "none";
	textareaRef.current.style.display = "none";
}

function transformVideo(openCV, videoRef, transformation, canvasRef, textRef) {
	if (timeout) clearTimeout(timeout);
	const FPS = 35;
	let video = videoRef.current;
	let canvas = canvasRef.current;
	let textarea = textRef.current;

	// change canvas tag style
	canvas.style.display = "block";
	textarea.style.display = "block";
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	textarea.style.width = video.videoWidth;
	textarea.style.height = video.videoHeight;

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
