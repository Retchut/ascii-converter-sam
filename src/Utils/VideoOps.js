import {
	grayscaleTransformation,
	rotateClockWise,
	rotateCounterClockWise,
	getImageASCII,
} from "./ImageTransformations";

let timeout = null;
let height, width;
let video, canvas, context;
let cv, src, dst;
let transf;

function setVideo(videoRef, video, canvasRef, textareaRef) {
	if (timeout) clearTimeout(timeout);
	videoRef.current.src = video;

	canvasRef.current.style.display = "none";
	textareaRef.current.style.display = "none";
}

function transformVideo(openCV, videoRef, transformation, canvasRef, textRef) {
	video = videoRef.current;
	canvas = canvasRef.current;

	canvas.style.display = "block";
	textRef.current.style.display = "block";

	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	height = video.videoHeight;
	width = video.videoWidth;

	context = canvas.getContext("2d");

	transf = transformation;
	cv = openCV;
	src = new cv.Mat(height, width, cv.CV_8UC4);
	dst = new cv.Mat(height, width, cv.CV_8UC4);

	// console.log(src, dst);

	/*switch (transformation) {
		case "grayscale":
			setTimeout(processVideo(grayscaleTransformation), 0);
			break;
		default:
			console.error("no such transformation --", transformation);
			return;
	}*/

	setTimeout(() => processVideo(canvasRef), 0);
}

function processVideo(canvasRef) {
	const FPS = 35;

	let begin = Date.now();

	context.drawImage(video, 0, 0, width, height);
	src.data.set(context.getImageData(0, 0, width, height).data);

	switch (transf) {
		case "grayscale":
			grayscaleTransformation(cv, src, dst);
			break;
		case "rotateClockwise":
			rotateClockWise(cv, src, dst);
			break;
		case "rotateCounterClockwise":
			rotateCounterClockWise(cv, src, dst);
			break;
		default:
			console.error("no such transformation --", transf);
			return;
	}

	cv.imshow(canvasRef.current, dst);

	let delay = 1000 / FPS - (Date.now() - begin);
	timeout = setTimeout(() => processVideo(canvasRef), delay);
}

export { transformVideo, setVideo };
