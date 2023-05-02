import "./App.css";
import {OpenCvProvider } from "opencv-react";
import Canvas from "./Components/Canvas.jsx";

function App() {
  return (
    <div>
      <p>popipopipopipo</p>
      <OpenCvProvider>
        <Canvas />
      </OpenCvProvider>
    </div>
  );
}

export default App;
