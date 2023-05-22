function grayscaleTransformation(openCV, src, dest) {
	openCV.cvtColor(src, dest, openCV.COLOR_RGBA2GRAY);
}

function rotateClockWise(openCV, src, dest) {
	openCV.rotate(src, dest, openCV.ROTATE_90_CLOCKWISE);
}

function rotateCounterClockWise(openCV, src, dest) {
	openCV.rotate(src, dest, openCV.ROTATE_90_COUNTERCLOCKWISE);
}

function getImageASCII(openCV, src) {
	openCV.cvtColor(src, src, openCV.COLOR_RGBA2GRAY);

	const asciiChars = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '@'];

	let asciiText = '';
	let charCount = 0;

	const blockSize = 15; // Size of the block for averaging (10px by 10px)

	for (let i = 0; i < src.rows; i += blockSize) {
		for (let j = 0; j < src.cols; j += blockSize) {
			let totalGrayscale = 0;

			// Calculate the average grayscale value of the block
			for (let x = i; x < i + blockSize; x++) {
				for (let y = j; y < j + blockSize; y++) {
					const grayscaleValue = src.ucharPtr(x, y)[0];
					totalGrayscale += grayscaleValue;
				}
			}

			const averageGrayscale = totalGrayscale / (blockSize * blockSize);
			const asciiIndex = Math.floor(averageGrayscale / (255 / (asciiChars.length - 1)));
			const asciiChar = asciiChars[asciiIndex];
			asciiText += asciiChar;
			charCount++;

			if (charCount >= (src.rows / blockSize)) {
				asciiText += '\n';
				charCount = 0;
			}
		}
	}

	return asciiText;
}



export {
	grayscaleTransformation,
	rotateClockWise,
	rotateCounterClockWise,
	getImageASCII,
};
