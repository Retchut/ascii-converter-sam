import { grayscaleTransformation, asciiTransformation } from "./ImageTransformations";

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
	// load original image from canvas
	let srcMat = openCV.imread(canvas);
	// create destination multi channel array

	// apply transformation
	switch (transformation) {
		case "grayscale":
			let dest = new openCV.Mat();
			grayscaleTransformation(openCV, srcMat, dest);
			openCV.imshow(canvas, dest);
		
			// cleanup
			dest.delete();
			break;
		case "ascii":
			asciiTransformation(openCV, srcMat, inputText);
			break;
		default:
			console.error("no such transformation --", transformation);
			return;
	}
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
