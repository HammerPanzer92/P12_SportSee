import { useEffect, useRef } from "react";
import { drawCurveChart } from "../services/graph";

function Sessions(){
    const ref = useRef();

    const data = [[1, 70], [40, 90], [200, 80], [300, 150]];

    useEffect(() => {
        drawCurveChart(data, ref.current);
    });

    return (
        <div ref={ref}></div>
    )
}

export default Sessions;