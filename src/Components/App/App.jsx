import { useState } from "react";
import { OpenCvProvider } from "opencv-react";

import Canvas from "../Canvas/Canvas.jsx";
import "./App.scss";

function App() {
	const [imageFile, setImageFile] = useState(null);

	const onFileChange = (e) => {
		setImageFile(e.target.files[0]);
	};

	return (
		<main className="app">
			<header>
				<h1 className="title stroke-text">ASCII converter SAM</h1>
			</header>
			<section className="content">
				<input
					className="btn-text"
					type="file"
					onChange={(e) => onFileChange(e)}
				/>
				{imageFile && (
					<OpenCvProvider>
						<Canvas uploadedImage={imageFile} />
					</OpenCvProvider>
				)}
			</section>
		</main>
	);
}

export default App;
