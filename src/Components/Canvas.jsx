import { useEffect, useRef } from "react";
import LoadedIMG from "../Assets/sample.png";

function Canvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let canvas = canvasRef.current;
    let context = canvas.getContext("2d");
  }, []);

  return (
    <div>
      <img src={LoadedIMG} className="original-img" />
      <canvas ref={canvasRef} className="converted-canvas"></canvas>
    </div>
  );
}

export default Canvas;
