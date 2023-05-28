function grayscaleTransformation(openCV, src, dest) {
	openCV.cvtColor(src, dest, openCV.COLOR_RGBA2GRAY);
}

function getChannelMask(openCV, src, dest, channelNum) {
	let rgbaPlanes = new openCV.MatVector();
	let mergedPlanes = new openCV.MatVector();
	openCV.split(src, rgbaPlanes);
	let channel = rgbaPlanes.get(channelNum);
	mergedPlanes.push_back(channel);
	openCV.merge(mergedPlanes, dest);
	rgbaPlanes.delete();
	mergedPlanes.delete();
}

function getRedMask(openCV, src, dest) {
	getChannelMask(openCV, src, dest, 0);
}

function getGreenMask(openCV, src, dest) {
	getChannelMask(openCV, src, dest, 1);
}

function getBlueMask(openCV, src, dest) {
	getChannelMask(openCV, src, dest, 2);
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

function flipHorizontal(openCV, src, dest) {
	openCV.flip(src, dest, 1);
}

function flipVertical(openCV, src, dest) {
	openCV.flip(src, dest, 0);
}

function getImageASCII(openCV, src, numChars) {
	openCV.cvtColor(src, src, openCV.COLOR_RGBA2GRAY);
	const asciiChars = ['@', '#', 'O', 'o', '*', '°', '.', ' '];
	
	let asciiText = "";
	
	const width = src.cols;
	const height = src.rows;
	
	const cellSize = Math.floor(Math.max(width, height) / numChars);
	console.log('Cell Size is: ', cellSize);
	
	const resizedWidth = Math.floor(width / cellSize);
	const resizedHeight = Math.floor(height / cellSize);
	
	openCV.resize(src, src, new openCV.Size(resizedWidth, resizedHeight));
	
	for (let y = 0; y < resizedHeight; y++) {
	  for (let x = 0; x < resizedWidth; x++) {
		const intensity = src.data[y * resizedWidth + x];
		const asciiIndex = Math.floor((intensity / 255) * (asciiChars.length - 1));
		const asciiChar = asciiChars[asciiIndex];
		
		asciiText += asciiChar;
	  }
	  
	  asciiText += "\n";
	}
	
	return asciiText;
}

export {
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
};
