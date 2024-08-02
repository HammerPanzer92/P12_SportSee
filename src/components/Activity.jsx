import { useEffect, useRef } from "react";
import drawBarChart from "../services/graph.js";

function Activity(){
    const ref = useRef();

    const data = [ 2, 4, 2, 6, 8, 5 ];

    useEffect(() => {
        drawBarChart(data, ref.current);
    });
    

    return(
        <div ref={ref}></div>
    )
}

export default Activity;