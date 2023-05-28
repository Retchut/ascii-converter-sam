import {
	grayscaleTransformation,
	redscaleTransformation,
	getRedMask,
	greenscaleTransformation,
	getGreenMask,
	bluescaleTransformation,
	getBlueMask,
	rotateClockWise,
	rotateCounterClockWise,
	flipHorizontal,
	flipVertical,
	getImageASCII,
} from "./ImageTransformations";

function setCanvasImage(canvasRef, image) {
	// load canvas context
	let canvas = canvasRef.current;
	let ctx = canvas.getContext("2d");

	// load image
	let srcImg = new Image();
	srcImg.src = image;

	// when the image is loaded, draw it in the canvas
	srcImg.onload = function () {
		canvas.width = srcImg.width;
		canvas.height = srcImg.height;
		ctx.drawImage(srcImg, 0, 0);
	};
}

function transformCanvas(openCV, canvasRef, transformation, textRef) {
	let canvas = canvasRef.current;
	let inputText = textRef.current;

	// set input text dimensions
	inputText.style.height =
		(canvas.height < inputText.scrollHeight
			? canvas.height
			: inputText.scrollHeight) + "px";
	inputText.style.width =
		(canvas.width < inputText.scrollWidth
			? canvas.width
			: inputText.scrollHeight) + "px";

	// load original image from canvas
	let srcMat = openCV.imread(canvas);

	let dest = new openCV.Mat();
	let asciiText = "";

	// apply transformation
	switch (transformation) {
		case "grayscale":
			grayscaleTransformation(openCV, srcMat, dest);
			break;
		case "redscale":
			redscaleTransformation(openCV, srcMat, dest);
			break;
		case "redMask":
			getRedMask(openCV, srcMat, dest);
			break;
		case "greenscale":
			greenscaleTransformation(openCV, srcMat, dest);
			break;
		case "greenMask":
			getGreenMask(openCV, srcMat, dest);
			break;
		case "bluescale":
			bluescaleTransformation(openCV, srcMat, dest);
			break;
		case "blueMask":
			getBlueMask(openCV, srcMat, dest);
			break;
		case "rotateClockwise":
			rotateClockWise(openCV, srcMat, dest);
			break;
		case "rotateCounterClockwise":
			rotateCounterClockWise(openCV, srcMat, dest);
			break;
		case "flipHorizontal":
			flipHorizontal(openCV, srcMat, dest);
			break;
		case "flipVertical":
			flipVertical(openCV, srcMat, dest);
			break;
		case "ascii":
			asciiText = getImageASCII(openCV, srcMat);
			break;
		default:
			console.error("no such transformation --", transformation);
			return;
	}

	// change image in canvas
	if (transformation === "ascii") {
		inputText.value = asciiText;
	} else {
		openCV.imshow(canvas, dest);
	}

	dest.delete();
	srcMat.delete();
}

function getImageRGBAMat(openCV, canvasRef) {
	let canvas = canvasRef.current;
	// load original image from canvas
	let srcMat = openCV.imread(canvas);
	let pixelRGB = [];
	const rgbaMat = srcMat.data;
	const channels = srcMat.channels();

	for (let i = 0; i < srcMat.rows; i++) {
		for (let j = 0; j < srcMat.cols; j++) {
			let r = rgbaMat[i * srcMat.cols * channels + j * channels + 0];
			let g = rgbaMat[i * srcMat.cols * channels + j * channels + 1];
			let b = rgbaMat[i * srcMat.cols * channels + j * channels + 2];
			let a = rgbaMat[i * srcMat.cols * channels + j * channels + 3];
			pixelRGB.push([r, g, b, a]);
		}
	}

	return pixelRGB;
}

export { setCanvasImage, transformCanvas, getImageRGBAMat };
