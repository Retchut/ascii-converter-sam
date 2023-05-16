function grayscaleTransformation(openCV, src, dest) {
	openCV.cvtColor(src, dest, openCV.COLOR_RGBA2GRAY);
}

function rotateClockWise(openCV, src, dest) {
	openCV.rotate(src, dest, openCV.ROTATE_90_CLOCKWISE);
}

function rotateCounterClockWise(openCV, src, dest) {
	openCV.rotate(src, dest, openCV.ROTATE_90_COUNTERCLOCKWISE);
}

export { grayscaleTransformation, rotateClockWise, rotateCounterClockWise };
