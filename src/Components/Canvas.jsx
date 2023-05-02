import { useEffect, useRef } from "react";
import LoadedIMG from "../Assets/sample.png";

function getPixelData(canvasContext, x, y) {
  return canvasContext.getImageData(x, y, 1, 1).data;
}

function Canvas() {
  const imgRef = useRef(null);
  const srcRef = useRef(null);
  const destRef = useRef(null);
  let img;
  let srcCanvas;
  let destCanvas;

  useEffect(() => {
    img = imgRef.current;
    /** @type {HTMLCanvasElement} */
    srcCanvas = srcRef.current;
    /** @type {HTMLCanvasElement} */
    destCanvas = destRef.current;
  }, [imgRef, srcRef, destRef]);

  const setCanvas = () => {
    // retrieve original image dimensions
    const imgWidth = img.width;
    const imgHeight = img.height;

    // set canvas dimensions
    srcCanvas.width = imgWidth;
    srcCanvas.height = imgHeight;
    destCanvas.width = imgWidth;
    destCanvas.height = imgHeight;

    // draw the image on the src canvas
    const srcContext = srcCanvas.getContext("2d");
    srcContext.drawImage(img, 0, 0);

    //
    console.log(getPixelData(srcContext, 10, 10));
    console.log(getPixelData(srcContext, 180, 10));
    console.log(getPixelData(srcContext, 10, 180));
    console.log(getPixelData(srcContext, 180, 10));

    const destContext = destCanvas.getContext("2d");
    // draw on destination context canvas
  };

  return (
    <div className="canvas-container">
      <img
        ref={imgRef}
        src={LoadedIMG}
        onLoad={setCanvas}
        className="src-img"
      />
      <canvas ref={srcRef} />
      <canvas ref={destRef} />
    </div>
  );
}

export default Canvas;
