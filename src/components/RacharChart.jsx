// src/components/RadarChart.js
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const RadarChart = ({ data, levels, maxValue }) => {
  const svgRef = useRef();

  // Utilisation d'un useEffect pour évite que le graphique soit créé plusieurs fois sur la même page
  useEffect(() => {
    if (data) {
      drawChart();
    }
  }, [data]);

  const drawChart = () => {
    svgRef.current.innerHTML = "";

    const kindList = [
      "Cardio",
      "Energie",
      "Endurance",
      "Force",
      "Vitesse",
      "Intensité",
    ];

    var arrayData = [];

    if (data === null) {
      arrayData = [
        { axis: "Intensité", value: 0 },
        { axis: "Vitesse", value: 0 },
        { axis: "Force", value: 0 },
        { axis: "Endurance", value: 0 },
        { axis: "Energie", value: 0 },
        { axis: "Cardio", value: 0 },
      ];
    } else {
      const dataList = data.data;

      for (let i = dataList.length - 1; i >= 0; i--) {
        const element = {
          axis: kindList[dataList[i].kind - 1],
          value: dataList[i].value,
        };
        arrayData.push(element);
      }
    }

    const width = 258; // Largeur du graph
    const height = 263; // Hauteur du graph
    const margin = 50; // Marge du graph
    const radius = Math.min(width / 2, height / 2) - margin; //Raddius du graph
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`); //Déplacement du centre de dessins au centre afin de pouvoir dessiner le graphique

    const angleSlice = (Math.PI * 2) / arrayData.length;

    // Dessins des axes (lignes et labels)
    svg
      .selectAll(".axis")
      .data(arrayData)
      .enter()
      .append("g")
      .attr("class", "axis")
      .each(function (d, i) {
        /* 
        // Les lignes des axes (pas utilisé ici)
        d3.select(this)
          .append('line')
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', radius * Math.cos(angleSlice * i - Math.PI / 2))
          .attr('y2', radius * Math.sin(angleSlice * i - Math.PI / 2))
          .style('stroke', 'grey')
          .style('stroke-width', '2px'); */
        // Ajout des labels des axes
        d3.select(this)
          .append("text")
          .attr("x", radius * 1.1 * Math.cos(angleSlice * i - Math.PI / 2))
          .attr("y", radius * 1.1 * Math.sin(angleSlice * i - Math.PI / 2))
          .attr("dy", "0.35em")
          .attr("fill", "white")
          .style("font-size", "12px")
          //Moddification du centrage du texte selon leur position sur le graphique
          .style("text-anchor", () => {
            if (i === 0 || i === arrayData.length / 2) {
              return "middle";
            } else if (i > arrayData.length / 2) {
              return "end";
            } else {
              return "start";
            }
          })
          .text((d) => d.axis);
      });

    // Polygon de fondds
    for (let level = 0; level < levels; level++) {
      const levelFactor = radius * ((level + 1) / levels);
      const points = [];
      for (let i = 0; i < arrayData.length; i++) {
        points.push([
          levelFactor * Math.cos(angleSlice * i - Math.PI / 2),
          levelFactor * Math.sin(angleSlice * i - Math.PI / 2),
        ]);
      }
      svg
        .append("polygon")
        .attr("class", "grid-polygon")
        .attr("points", points.map((d) => d.join(",")).join(" "))
        .style("fill", "#282D30")
        .style("stroke", "#CDCDCD")
        .style("stroke-width", "1px")
        .style("fill-opacity", 0.1);
    }

    // Création du graph en lui-même via une ligne rempli avec un radius défini afin de créé un polygone
    const radarLine = d3
      .lineRadial()
      .radius((d) => radius * (d.value / maxValue))
      .curve(d3.curveLinearClosed)
      .angle((d, i) => i * angleSlice);

    svg
      .append("path")
      .datum(arrayData)
      .attr("d", radarLine)
      .style("stroke-width", "0px")
      .style("stroke", "#FF0101B2")
      .style("fill", "#FF0101B2")
      .style("fill-opacity", 0.7);
  };

  if (data) {
    return <svg className="svg_radar" ref={svgRef}></svg>;
  } else {
    return (
      <div className="nodata">
        <p>Aucune données</p>
      </div>
    );
  }
};

export default RadarChart;
