// src/components/RadarChart.js
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const RadarChart = ({ data, levels, maxValue }) => {
  const svgRef = useRef();

  useEffect(() => {
    drawChart();
  }, [data]);

  const drawChart = () => {
    svgRef.current.innerHTML = "";

    const width = 258;  // Increased width
    const height = 263; // Increased height
    const margin = 50;  // Margin to prevent cutoff
    const radius = Math.min(width / 2, height / 2) - margin;
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const angleSlice = (Math.PI * 2) / data.length;

    // Draw axis lines and labels
    svg.selectAll('.axis')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'axis')
      .each(function (d, i) {/* 
        // Draw the axis line
        d3.select(this)
          .append('line')
          .attr('x1', 0)
          .attr('y1', 0)
          .attr('x2', radius * Math.cos(angleSlice * i - Math.PI / 2))
          .attr('y2', radius * Math.sin(angleSlice * i - Math.PI / 2))
          .style('stroke', 'grey')
          .style('stroke-width', '2px'); */

        // Add the axis label
        d3.select(this)
          .append('text')
          .attr('x', radius * 1.1 * Math.cos(angleSlice * i - Math.PI / 2))
          .attr('y', radius * 1.1 * Math.sin(angleSlice * i - Math.PI / 2))
          .attr('dy', '0.35em')
          .attr("fill", "white")
          .style('font-size', '12px')
/*           .style('text-anchor', i === 0 || i === data.length / 2 ? 'middle' : 'middle') */
        .style('text-anchor', () => {
          if(i===0 || i === data.length/2){
            return "middle";
          }else if(i > data.length/2){
            return "end";
          }else{
            return "start";
          }
        })
          .text(d => d.axis);
      });

    // Draw background hexagons
    for (let level = 0; level < levels; level++) {
      const levelFactor = radius * ((level + 1) / levels);
      const points = [];
      for (let i = 0; i < data.length; i++) {
        points.push([
          levelFactor * Math.cos(angleSlice * i - Math.PI / 2),
          levelFactor * Math.sin(angleSlice * i - Math.PI / 2),
        ]);
      }
      svg.append('polygon')
        .attr('class', 'grid-polygon')
        .attr('points', points.map(d => d.join(',')).join(' '))
        .style('fill', '#282D30')
        .style('stroke', '#CDCDCD')
        .style("stroke-width","1px")
        .style('fill-opacity', 0.1);
    }

    // Draw the radar chart
    const radarLine = d3.lineRadial()
      .radius(d => radius * (d.value / maxValue))
      .curve(d3.curveLinearClosed)
      .angle((d, i) => i * angleSlice);

    svg.append('path')
      .datum(data)
      .attr('d', radarLine)
      .style('stroke-width', '0px')
      .style('stroke', '#FF0101B2')
      .style('fill', '#FF0101B2')
      .style('fill-opacity', 0.7);
  };

  return (
    <svg className="svg_radar" ref={svgRef}></svg>
  );
};

export default RadarChart;
