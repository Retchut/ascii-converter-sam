import { useState } from "react";
import { OpenCvProvider } from "opencv-react";

import Canvas from "./Components/Canvas.jsx";
import "./App.scss";

function App() {
	const [imageFile, setImageFile] = useState(null);

	const onFileChange = (e) => {
		setImageFile(e.target.files[0]);
	};

	return (
		<div className="page">
			<h1 className="title">ASCII converter SAM</h1>
			<input type="file" onChange={(e) => onFileChange(e)} />
			{imageFile && (
				<OpenCvProvider>
					<Canvas uploadedImage={imageFile} />
				</OpenCvProvider>
			)}
		</div>
	);
}

export default App;
