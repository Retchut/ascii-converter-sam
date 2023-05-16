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
			<div className="title">
				<h1>ASCII converter SAM</h1>
			</div>
			<div className="content">
				<input type="file" onChange={(e) => onFileChange(e)} />
				{imageFile && (
					<OpenCvProvider>
						<Canvas uploadedImage={imageFile} />
					</OpenCvProvider>
				)}
			</div>
		</div>
	);
}

export default App;
