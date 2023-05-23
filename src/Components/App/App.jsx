import { useState } from "react";
import { OpenCvProvider } from "opencv-react";

import Canvas from "../Canvas/Canvas.jsx";
import "./App.scss";

function App() {
	const [files, setFiles] = useState({ imageFile: null, videoFile: null });

	const releaseFiles = () => {
		if (files.imageFile !== null) {
			URL.revokeObjectURL(files.imageFile);
		}
		if (files.videoFile !== null) {
			URL.revokeObjectURL(files.videoFile);
		}
	};

	const loadImage = (file) => {
		setFiles({
			imageFile: URL.createObjectURL(file),
			videoFile: null,
		});
	};

	const loadVideo = (file) => {
		setFiles({
			imageFile: null,
			videoFile: URL.createObjectURL(file),
		});
	};

	const onFileChange = (e) => {
		if (e.target.files[0] === undefined) {
			return;
		}
		let file = e.target.files[0];
		const fileType = file.type.split("/");

		switch (fileType[0]) {
			case "image":
				releaseFiles();
				if (fileType[1] === "gif") {
					loadVideo(file);
				} else {
					loadImage(file);
				}
				break;
			case "video":
				releaseFiles();
				loadVideo(file);
				break;
			default:
				break;
		}
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
				{files.imageFile && (
					<OpenCvProvider>
						<Canvas uploadedImage={files.imageFile} />
					</OpenCvProvider>
				)}
				{files.videoFile && (
					<OpenCvProvider>
						{/* Insert video editor component here */}
						{/* <VideoCanvas uploadedImage={files.videoFile} /> */}
					</OpenCvProvider>
				)}
			</section>
		</main>
	);
}

export default App;
