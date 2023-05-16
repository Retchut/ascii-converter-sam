
import { OpenCvProvider } from "opencv-react";

import Canvas from "./Components/Canvas.jsx";
import "./App.scss";

function App() {

	return (<div className="page">
		<h1 className="title">ASCII converter SAM</h1>
		<input type="file" />

		<OpenCvProvider>
			<Canvas />
		</OpenCvProvider>
	</div>);
}

export default App;
