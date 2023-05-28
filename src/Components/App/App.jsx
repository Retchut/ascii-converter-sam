import { useState } from "react";
import { OpenCvProvider } from "opencv-react";

import Canvas from "../Canvas/Canvas.jsx";
import VideoEditor from "../VideoEditor/VideoEditor.jsx";
import { resetTimeout } from "../../Utils/VideoOps.js";
import "./App.scss";

function App() {
	const [files, setFiles] = useState({
		imageFile: null,
		videoFile: null,
		error: "",
	});

	const releaseFiles = () => {
		if (files.imageFile !== null) {
			URL.revokeObjectURL(files.imageFile);
		}
		if (files.videoFile !== null) {
			resetTimeout();
			URL.revokeObjectURL(files.videoFile);
		}
	};

	const loadImage = (file) => {
		setFiles({
			imageFile: URL.createObjectURL(file),
			videoFile: null,
			error: "",
		});
	};

	const loadVideo = (file) => {
		setFiles({
			imageFile: null,
			videoFile: URL.createObjectURL(file),
			error: "",
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
				setFiles({
					error: "Image type not supported",
				});
				break;
		}
	};

	return (
		<main className="app">
			<header>
				<h1 className="title stroke-text">ASCII converter</h1>
			</header>
			<section className="content">
				<input
					className="btn-text"
					type="file"
					onChange={(e) => onFileChange(e)}
				/>
				<OpenCvProvider>
					{files.error && <h1 className="stroke-text">{files.error}</h1>}
					{files.imageFile && <Canvas uploadedImage={files.imageFile} />}
					{files.videoFile && <VideoEditor uploadedVideo={files.videoFile} />}
				</OpenCvProvider>
			</section>
		</main>
	);
}

export default App;
