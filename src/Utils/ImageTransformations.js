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
  
	const asciiChars = '.`^\',":;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwoahkbdpqwm*#MW&B8%BL@$';
  
	const imageWidth = src.cols;
	const imageHeight = src.rows;
  
	const maxWidth = 900;
	const maxHeight = 512;
  
	const aspectRatio = Math.min(maxWidth / imageWidth, maxHeight / imageHeight);
	const blockSize = Math.ceil(15 * aspectRatio);
  
	let asciiText = '';
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
		const asciiIndex = Math.floor((asciiChars.length - 1) * (1 - averageGrayscale / 255));
		const asciiChar = asciiChars[asciiIndex];
		asciiText += asciiChar;
		charCount++;
  
		if (charCount >= (imageWidth / blockSize)) {
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
