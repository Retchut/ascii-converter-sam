
import { OpenCvProvider } from "opencv-react";

import Canvas from "./Components/Canvas.jsx";
import "./App.scss";

function App() {

	return (<div className="page">
		<div className="title">
			<h1>ASCII converter SAM</h1>
		</div>
		<div className="content">
			<input type="file" />
			<OpenCvProvider>
				<Canvas />
			</OpenCvProvider>
		</div>
	</div>);
}

export default App;
