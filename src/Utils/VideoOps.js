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
	const video = videoRef.current;
	const canvas = canvasRef.current;

	// change canvas tag style
	canvas.style.display = "block";
	textRef.current.style.display = "block";
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;

	setTimeout(() => processVideo(openCV, transformation, canvas, video), 0);
}

function processVideo(openCV, transformation, canvas, video) {
	const context = canvas.getContext("2d");
	const height = video.videoHeight;
	const width = video.videoWidth;
	const FPS = 35;
	let src = new openCV.Mat(height, width, openCV.CV_8UC4);
	let dst = new openCV.Mat(height, width, openCV.CV_8UC4);

	let begin = Date.now();

	context.drawImage(video, 0, 0, width, height);
	src.data.set(context.getImageData(0, 0, width, height).data);

	switch (transformation) {
		case "grayscale":
			grayscaleTransformation(openCV, src, dst);
			break;
		case "rotateClockwise":
			rotateClockWise(openCV, src, dst);
			break;
		case "rotateCounterClockwise":
			rotateCounterClockWise(openCV, src, dst);
			break;
		default:
			console.error("no such transformation --", transformation);
			return;
	}

	openCV.imshow(canvas, dst);

	let delay = 1000 / FPS - (Date.now() - begin);
	timeout = setTimeout(
		() => processVideo(openCV, transformation, canvas, video),
		delay
	);
}

export { transformVideo, setVideo };
