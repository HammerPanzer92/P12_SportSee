import { useEffect, useRef } from "react";
import drawBarChart from "../services/graph.js";

function Activity(){
    const ref = useRef();

    const data = [[80,240],[80,220],[81,200],[81,290],[80,160],[78,162],[76,390]];

    useEffect(() => {
        drawBarChart(data, ref.current);
    });
    

    return(
        <div ref={ref}></div>
    )
}

export default Activity;