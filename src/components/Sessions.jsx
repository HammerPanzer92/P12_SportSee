import { useEffect, useRef } from "react";
import { drawCurveChart } from "../services/graph";

function Sessions(props){
    const ref = useRef();

    const data = [[1, 70], [40, 90], [200, 80], [300, 150]];

    useEffect(() => {
        if(props.data){
            console.log("props");
            console.log(props.data);
            props.data.sessions.unshift({day: 0, sessionLength: 0});
            props.data.sessions.push({day: 8, sessionLength: 0});
            drawCurveChart(props.data.sessions, ref.current);
        }
    });

    return (
        <div ref={ref}></div>
    )
}

export default Sessions;