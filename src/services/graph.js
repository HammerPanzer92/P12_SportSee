import * as d3 from "d3";

export default function drawBarChart(data, ref) {
  ref.innerHTML = "";

  const barWidth = 7;
  const barPadding = 10;

  const averageFunc = (array) => array.reduce((a, b) => a + b) / array.length;

  //top = 88, right = 90, bottom = 40, left = 43
  const margin = { top: 88, right: 90, bottom: 40, left: 43 };
  const canvasHeight = 145 + margin.top + margin.bottom;
  const canvasWidth = 702 + margin.left + margin.right;

  const innerHeight = canvasHeight - margin.top - margin.bottom;
  const innerWidth = canvasWidth - margin.left - margin.right;

  const minKg = Math.min(...data.map((d) => d[0])) - 1;
  const averageKg = Math.round(averageFunc(data.map((d) => d[0])));
  const maxKg = Math.max(...data.map((d) => d[0])) + 1;

  const minCal = Math.min(...data.map((d) => d[1])) - 1;
  const maxCal = Math.max(...data.map((d) => d[1])) + 1;

  const yScaleKg = d3.scaleLinear([minKg, maxKg], [innerHeight, 0]);

  const yScaleCal = d3.scaleLinear([minCal, maxCal], [innerHeight, 0]);

  const svgCanvas = d3
    .select(ref)
    .append("svg")
    .attr("width", canvasWidth)
    .attr("height", canvasHeight);

    svgCanvas.append("text")
    .attr("fill","#20253A")
    .attr("y", 24)
    .attr("x", margin.left)
    .text("Activité quotidienne");

    const circleBlackX = 536;
    const circleY = 18;

    svgCanvas.append("circle")
    .attr("r", 4)
    .attr("cx", circleBlackX)
    .attr("cy", circleY)
    .attr("fill", "#282D30");

    svgCanvas.append("text")
    .attr("y", 24)
    .attr("x", circleBlackX + 10)
    .text("Poids (kg)")
    .attr("fill", "#74798C");

    svgCanvas.append("circle")
    .attr("r", 4)
    .attr("cx", circleBlackX + 110)
    .attr("cy", circleY)
    .attr("fill", "#E60000");

    svgCanvas.append("text")
    .attr("y", 24)
    .attr("x", circleBlackX + 122)
    .text("Calories brûlées (kCal)")
    .attr("fill", "#74798C");

  const lines = [
    { y: yScaleKg(minKg), label: minKg },
    { y: yScaleKg(averageKg), label: averageKg },
    { y: yScaleKg(maxKg), label: maxKg },
  ];

  lines.forEach((line, index) => {
    svgCanvas
      .append("line")
      .attr("x1", margin.left)
      .attr("y1", line.y + margin.top)
      .attr("x2", canvasWidth - margin.right)
      .attr("y2", line.y + margin.top)
      .attr("stroke", "gray")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", index === 0 ? "none" : "4");

    svgCanvas
      .append("text")
      .attr("x", canvasWidth - margin.right + 10)
      .attr("y", line.y + 3 + margin.top)
      .attr("fill", "gray")
      .attr("font-size", "12px")
      .text(line.label);
  });

  // Dimensions de la tooltip
  const tooltipWidth = 39;
  const tooltipHeight = 63;
  const tooltipY = margin.top - 50; // Position Y de la tooltip

  data.forEach((pair, index) => {
    const [kg, cal] = pair;
    const groupX = margin.left + index * (2 * barWidth + barPadding + 54);

    const tooltipX = groupX + 39 + 7; // Position X de la tooltip

    // Rect pour la sélection(et affichage du tooltip)
    svgCanvas
      .append("rect")
      .attr("x", groupX - 14)
      .attr("y", margin.top)
      .attr("width", 2.5 * barWidth + barPadding + 28)
      .attr("height", innerHeight)
      .attr("fill", "transparent")
      .on("mouseover", function () {
        d3.select(this).attr("fill", "lightgray");

        // Création du tooltip
        const tooltip = svgCanvas.append("g").attr("id", "tooltip");

        tooltip
          .append("rect")
          .attr("x", groupX + 39 + 7)
          .attr("y", margin.top - 50)
          .attr("width", 39)
          .attr("height", 63)
          .attr("fill", "red");

        tooltip
          .append("text")
          .attr("x", tooltipX + tooltipWidth / 2) // Centrer le texte horizontalement
          .attr("y", tooltipY + tooltipHeight / 3) // Ajuster la position verticale
          .attr("fill", "white")
          .attr("font-size", "7px")
          .attr("text-anchor", "middle")
          .text(`${kg}Kg`);

        tooltip
          .append("text")
          .attr("x", tooltipX + tooltipWidth / 2) // Centrer le texte horizontalement
          .attr("y", tooltipY + (tooltipHeight * 2) / 3) // Ajuster la position verticale
          .attr("fill", "white")
          .attr("font-size", "7px")
          .attr("text-anchor", "middle")
          .text(`${cal}Kcal`);
      })
      .on("mouseout", function () {
        d3.select(this).attr("fill", "transparent");

        // Remove tooltip
        svgCanvas.select("#tooltip").remove();
      });

    // Bar affichant les données
    svgCanvas
      .append("rect")
      .attr("width", barWidth)
      .attr("height", innerHeight - yScaleKg(kg))
      .attr("fill", "black")
      .attr("x", groupX)
      .attr("y", margin.top + yScaleKg(kg));

    svgCanvas
      .append("rect")
      .attr("width", barWidth)
      .attr("height", innerHeight - yScaleCal(cal))
      .attr("fill", "red")
      .attr("x", groupX + barWidth + 8)
      .attr("y", margin.top + yScaleCal(cal));

    svgCanvas
      .append("text")
      .attr("fill", "#9B9EAC")
      .text(index + 1)
      .attr("x", groupX + barWidth)
      .attr("y", canvasHeight - 16);
  });
}

export function drawCurveChart(data, ref) {
  ref.innerHTML = "";

  const canvasHeight = 145;
  const canvasWidth = 702;
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
