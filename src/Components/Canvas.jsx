import { useEffect } from "react";
import { useOpenCv } from "opencv-react";

function Canvas() {
    const { loaded, cv } = useOpenCv()

    useEffect(() => {
        if (cv) {
            let canvas = document.getElementById("pop");
            let ctx = canvas.getContext('2d');
            let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }
    }, [cv])

    return <canvas id="pop" className="app-canvas"></canvas>
}

export default Canvas;