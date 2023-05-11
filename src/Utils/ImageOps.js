import { grayscaleTransformation } from "./ImageTransformations";

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

function transformCanvas(openCV, canvasRef, transformation) {
	let canvas = canvasRef.current;
	// load original image from canvas
	let srcImage = openCV.imread(canvas);
	// create destination multi channel array
	let dest = new openCV.Mat();

	// apply transformation
	switch (transformation) {
		case "grayscale":
			grayscaleTransformation(openCV, srcImage, dest);
			break;
		default:
			console.error("no such transformation --", transformation);
			return;
	}

	// display image on canvas
	openCV.imshow(canvas, dest);

	// cleanup
	srcImage.delete();
	dest.delete();
}

function getPixelData(canvasContext, x, y) {
	return canvasContext.getImageData(x, y, 1, 1).data;
}

export { setCanvasImage, transformCanvas, getPixelData };
