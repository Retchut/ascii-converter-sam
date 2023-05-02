import { useEffect, useRef } from "react";
import LoadedIMG from "../Assets/sample2.png";

function Canvas() {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    let canvas = canvasRef.current;
    let context = canvas.getContext("2d");
    let img = imgRef.current;
    context.drawImage(img, 0, 0);
  }, []);

  return (
    <div>
      <img ref={imgRef} src={LoadedIMG} className="original-img" />
      <canvas ref={canvasRef} className="converted-canvas"></canvas>
    </div>
  );
}

export default Canvas;
