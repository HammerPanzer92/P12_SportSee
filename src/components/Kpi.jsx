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

    // Arc de fond
    const backgroundArc = d3
      .arc()
      .innerRadius(size / 2 - 20)
      .outerRadius(size / 2)
      .startAngle(0)
      .endAngle(2 * Math.PI);

    svg.append("path").attr("d", backgroundArc).attr("fill", "#FBFBFB");

    //Création de l'arc selon la valeur (par défaut de 0 a 100)
    const arc = d3
      .arc()
      .innerRadius(size / 2 - 10)
      .outerRadius(size / 2)
      .startAngle(0)
      .endAngle(() => {
        if (value >= 0) {
          return -(2 * Math.PI * (value - min)) / (max - min);
        } else {
          return -((2 * Math.PI * 0) / (max - min));
        }
      })
      .cornerRadius(50);

    svg.append("path").attr("d", arc).attr("fill", "#FF0000");

    var text = [];
    const lineHeight = "26px";

    if (value >= 0) {
      text = [`${value}%`, "de votre", "objectif"];
    } else {
      text = ["Aucune", "données"];
    }

    // Ajout du texte au centre
    var textSvg = svg
      .append("text")
      .attr("text-anchor", "middle")
      .attr("y", -(size / 10) + "px")
      .attr("font-size", "20px")
      .attr("fill", "#333");

    text.forEach((line, index) => {
      textSvg
        .append("tspan")
        .attr("dy", `${index === 0 ? 0 : lineHeight}`)
        .attr("fill", `${index === 0 ? "black" : "#74798C"}`)
        .text(line);
    });

    textSvg.selectAll("tspan").attr("x", 0);

    return () => {
      d3.select(ref.current).selectAll("*").remove();
    };
  }, [value, min, max, size]);

  return <svg ref={ref}></svg>;
};

export default KpiGraph;
