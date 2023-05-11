function grayscaleTransformation(openCV, src, dest) {
	openCV.cvtColor(src, dest, openCV.COLOR_RGBA2GRAY);
}

export { grayscaleTransformation };
