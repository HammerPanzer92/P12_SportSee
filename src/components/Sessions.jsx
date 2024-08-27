import { useEffect, useRef } from "react";
import * as d3 from "d3";

function Sessions(props) {
  const ref = useRef();

  useEffect(() => {
    if (props.data) {
      const data = props.data.sessions;

      if (data.length != 9) {
        data.unshift({ day: 0, sessionLength: 0 });
        data.push({ day: 8, sessionLength: 0 });
      }

      const margin = { bottom: 16, left: 14, top: 40, textLeft: 34 };

      // Table containing the days (to display under the curve)
      const listDay = ["L", "M", "M", "J", "V", "S", "D"];
      const canvasHeight = 263;
      const canvasWidth = 258;

      // Calculate max and min values for the chart scale
      const xValues = data.map((d) => d.day);
      const yValues = data.map((d) => d.sessionLength);

      const xMin = d3.min(xValues);
      const xMax = d3.max(xValues);
      const yMax = d3.max(yValues) + 1;

      // Adjust the xScale to place the first and last points on the edges
      const xScale = d3.scaleLinear([xMin, xMax], [0, canvasWidth]);

      const yScale = d3.scaleLinear(
        [0, yMax],
        [canvasHeight - margin.bottom, margin.top]
      );

      const svgCanvas = d3
        .select(ref.current)
        .append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)
        .attr("class", "sessionchart")
        .style("background", "#FF0000");

      const bgRect = svgCanvas
        .append("rect")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight)
        .style("fill", "#000000")
        .style("opacity", 0.0975)
        .attr("y", 0)
        .attr("x", canvasWidth);

      // Create gradient for the curve
      const defs = svgCanvas.append("defs");

      const gradient = defs
        .append("linearGradient")
        .attr("id", "gradient")
        .attr("x1", "100%")
        .attr("x2", "0%")
        .attr("y1", "0%")
        .attr("y2", "0%");

      gradient
        .append("stop")
        .attr("offset", "1.19%")
        .attr("stop-color", "#FFFFFF");

      gradient
        .append("stop")
        .attr("offset", "81.27%")
        .attr("stop-color", "rgba(255, 255, 255, 0.403191)");

      const curve = d3
        .line()
        .curve(d3.curveNatural)
        .x((d) => xScale(d.day))
        .y((d) => yScale(d.sessionLength));

      // Draw the curve with gradient
      svgCanvas
        .append("path")
        .attr("d", curve(data))
        .attr("stroke", "url(#gradient)") // Apply the gradient
        .attr("stroke-width", 2)
        .attr("fill", "none");

      // Add invisible circles for data points
      svgCanvas
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d.day))
        .attr("cy", (d) => yScale(d.sessionLength))
        .attr("r", 5) // Radius to ensure the circle is detectable
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function (event, d) {
          // Show tooltip
          tooltip
            .style("visibility", "visible")
            .style("top", `${event.pageY + 10}px`)
            .style("left", `${event.pageX + 10}px`)
            .html(`${d.sessionLength} min`);

          // Optionally, you can change the style of the hovered point
          d3.select(this)
            .style("fill", "white")
            .style("stroke", "black")
            .style("stroke-width", 1);

          bgRect.attr("x", xScale(d.day));
        })
        .on("mouseout", function () {
          // Hide tooltip
          tooltip.style("visibility", "hidden");

          bgRect.attr("x", canvasWidth);

          // Reset the style of the point
          d3.select(this).style("fill", "none").style("stroke", "none");
        });

      // Create the tooltip element (initially hidden)
      const tooltip = d3
        .select(ref.current)
        .append("div")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "white")
        .style("padding", "5px")
        .style("font-size", "10px");

      // Add day labels below each data point (except the first and last)
      svgCanvas
        .selectAll("text.day-label")
        .data(data.slice(1, -1)) // Exclude first and last
        .enter()
        .append("text")
        .attr("class", "day-label")
        .attr("x", (d) => xScale(d.day))
        .attr("y", canvasHeight - margin.bottom + 12) // Adjust for label position
        .attr("text-anchor", "middle")
        .attr("fill", "#FFFFFF")
        .attr("font-size", "12px")
        .text((d, i) => listDay[i]) // Adjust index to match data slicing
        .attr("opacity", 0.5);

      // Add chart title
      svgCanvas
        .append("text")
        .attr("x", margin.textLeft)
        .attr("y", 20) // Adjust based on your needs
        .attr("text-anchor", "start")
        .attr("fill", "#FFFFFF")
        .attr("font-size", "14px")
        .text("Durée moyenne des")
        .attr("opacity", 0.5);

      svgCanvas
        .append("text")
        .attr("x", margin.textLeft)
        .attr("y", 40) // Adjust this value to control vertical position
        .attr("text-anchor", "start")
        .attr("fill", "#FFFFFF")
        .attr("font-size", "14px")
        .text("sessions")
        .attr("opacity", 0.5);

      return () => {
        // Clean up on component unmount
        d3.select(ref.current).select("svg").remove();
      };
    }
  }, [props]);

  return <div ref={ref}></div>;
}

export default Sessions;
