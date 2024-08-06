import * as d3 from "d3";

export default function drawBarChart(data, ref) {
  ref.innerHTML = "";

  const canvasHeight = 145;
  const canvasWidth = 702;
  const scale = 10;
  const svgCanvas = d3
    .select(ref)
    .append("svg")
    .attr("width", canvasWidth)
    .attr("height", canvasHeight)
    .style("border", "1px solid black");
  svgCanvas
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("width", 7)
    .attr("height", (datapoint) => datapoint * scale)
    .attr("fill", (datapoint, iteration) => {
      if (iteration % 2 === 0) {
        return "red";
      } else {
        return "black";
      }
    })
    .attr("x", (datapoint, iteration) => {
      if (iteration % 2 === 0) {
        return 8 + (54 * iteration) / 2;
      } else {
        return (54 * iteration) / 2;
      }
    })
    .attr("y", (datapoint) => canvasHeight - datapoint * scale);
}

export function drawCurveChart(data, ref) {
  ref.innerHTML = "";

  const canvasHeight = 145;
  const canvasWidth = 702;
  const scale = 10;
  const svgCanvas = d3
    .select(ref)
    .append("svg")
    .attr("width", canvasWidth)
    .attr("height", canvasHeight)
    .style("border", "1px solid black")
    .style("background", "red");

  const curve = d3
    .line()
    .curve(d3.curveNatural)
    .x((d) => d[0])
    .y((d) => d[1]);
  svgCanvas
    .append("path")
    .attr("d", curve(data))
    .attr("stroke", "white")
    .attr("stroke-width", 2)
    .attr("fill", "none");
}

export function drawRadarChart(data, ref) {

}
