import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const KpiGraph = ({ value, min = 0, max = 100, size = 200 }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("width", size)
      .attr("height", size)
      .append("g")
      .attr("transform", `translate(${size / 2}, ${size / 2})`);

    // Add background arc
    const backgroundArc = d3
      .arc()
      .innerRadius(size / 2 - 20)
      .outerRadius(size / 2)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    svg.append("path").attr("d", backgroundArc).attr("fill", "#FBFBFB");

    const arc = d3
      .arc()
      .innerRadius(size / 2 - 10)
      .outerRadius(size / 2)
      .startAngle(0)
      .endAngle((2 * Math.PI * (value - min)) / (max - min));

    svg.append("path").attr("d", arc).attr("fill", "#FF0000");

    const text = [`${value}%`, "de votre", "objectif"];

    // Add the text label in the center
    var textSvg = svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("font-size", "20px")
      .attr("fill", "#333");

    const lineHeight = "26px";
    text.forEach((line, index) => {
      textSvg
        .append("tspan")
        .attr("dy", `${index === 0 ? 0 : lineHeight}`)
        .text(line);
    });

    textSvg.selectAll("tspan").attr("x",10)

    return () => {
      d3.select(ref.current).selectAll("*").remove();
    };
  }, [value, min, max, size]);

  return <svg ref={ref}></svg>;
};

export default KpiGraph;
