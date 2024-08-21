import { useEffect, useRef } from "react";
import drawBarChart from "../services/graph.js";

function Activity(props) {
  const ref = useRef();

  useEffect(() => {
    if (props.data) {
      drawBarChart(props.data.sessions, ref.current);
    }
  });

  return <div className="barchart" ref={ref}></div>;
}

export default Activity;
