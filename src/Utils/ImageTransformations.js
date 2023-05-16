function grayscaleTransformation(openCV, src, dest) {
	openCV.cvtColor(src, dest, openCV.COLOR_RGBA2GRAY);
}



function asciiTransformation(openCV, src, inputText) {
	openCV.cvtColor(src, src, openCV.COLOR_RGBA2GRAY);
  
	const asciiChars = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '@'];
  
	let asciiText = '';

	for (let i = 0; i < src.rows; i++) {
		for (let j = 0; j < src.cols; j++) {
		const grayscaleValue = src.ucharPtr(i, j)[0];
		const asciiIndex = Math.floor(grayscaleValue / (255 / (asciiChars.length - 1)));
		const asciiChar = asciiChars[asciiIndex];
		asciiText += asciiChar;
		}
		asciiText += '\n';
	}
	
  
	inputText.value = asciiText;
}
  

export { grayscaleTransformation, asciiTransformation };