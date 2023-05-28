function grayscaleTransformation(openCV, src, dest) {
	openCV.cvtColor(src, dest, openCV.COLOR_RGBA2GRAY);
}

function getChannel(openCV, src, dest, channelNum) {
	if (![0, 1, 2].includes(channelNum)) {
		// Just remove transparency
		openCV.cvtColor(src, dest, openCV.COLOR_RGBA2RGB);
		return;
	}

	let rgbaPlanes = new openCV.MatVector();
	let mergedPlanes = new openCV.MatVector();

	// split
	openCV.split(src, rgbaPlanes);
	// get red
	let channel = rgbaPlanes.get(channelNum);
	let zeroChannel = openCV.Mat.zeros(src.rows, src.cols, openCV.CV_8UC1);

	// reconstruct
	switch (channelNum) {
		case 0:
			mergedPlanes.push_back(channel);
			mergedPlanes.push_back(zeroChannel);
			mergedPlanes.push_back(zeroChannel);
			break;
		case 1:
			mergedPlanes.push_back(zeroChannel);
			mergedPlanes.push_back(channel);
			mergedPlanes.push_back(zeroChannel);
			break;
		case 2:
			mergedPlanes.push_back(zeroChannel);
			mergedPlanes.push_back(zeroChannel);
			mergedPlanes.push_back(channel);
			break;
	}

	openCV.merge(mergedPlanes, dest);
	rgbaPlanes.delete();
	mergedPlanes.delete();
}

function redscaleTransformation(openCV, src, dest) {
	getChannel(openCV, src, dest, 0);
}

function greenscaleTransformation(openCV, src, dest) {
	getChannel(openCV, src, dest, 1);
}

function bluescaleTransformation(openCV, src, dest) {
	getChannel(openCV, src, dest, 2);
}

function rotateClockWise(openCV, src, dest) {
	openCV.rotate(src, dest, openCV.ROTATE_90_CLOCKWISE);
}

function rotateCounterClockWise(openCV, src, dest) {
	openCV.rotate(src, dest, openCV.ROTATE_90_COUNTERCLOCKWISE);
}

function getImageASCII(openCV, src) {
	openCV.cvtColor(src, src, openCV.COLOR_RGBA2GRAY);

	const asciiChars = [".", ",", "$", "Y", "+", "P", "*", "%", "D", "J", "@"];

	const imageWidth = src.cols;
	const imageHeight = src.rows;

	const maxWidth = 900;
	const maxHeight = 512;

	const aspectRatio = Math.min(maxWidth / imageWidth, maxHeight / imageHeight);
	const blockSize = Math.ceil(15 * aspectRatio);

	let asciiText = "";
	let charCount = 0;

	for (let i = 0; i < imageHeight; i += blockSize) {
		for (let j = 0; j < imageWidth; j += blockSize) {
			let totalGrayscale = 0;

			for (let x = i; x < Math.min(i + blockSize, imageHeight); x++) {
				for (let y = j; y < Math.min(j + blockSize, imageWidth); y++) {
					const grayscaleValue = src.ucharPtr(x, y)[0];
					totalGrayscale += grayscaleValue;
				}
			}

			const averageGrayscale = totalGrayscale / (blockSize * blockSize);
			const asciiIndex = Math.floor(
				(asciiChars.length - 1) * (1 - averageGrayscale / 255)
			);
			const asciiChar = asciiChars[asciiIndex];
			asciiText += asciiChar;
			charCount++;

			if (charCount >= imageWidth / blockSize) {
				asciiText += "\n";
				charCount = 0;
			}
		}
	}

	return asciiText;
}

export {
	grayscaleTransformation,
	redscaleTransformation,
	bluescaleTransformation,
	greenscaleTransformation,
	rotateClockWise,
	rotateCounterClockWise,
	getImageASCII,
};
