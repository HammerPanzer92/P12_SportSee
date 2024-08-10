import * as d3 from "d3";

export default function drawBarChart(data, ref) {
  ref.innerHTML = "";

  const barWidth = 7;
  const barPadding = 10;

  const averageFunc = (array) => array.reduce((a, b) => a + b) / array.length;

  const margin = 10;
  const canvasHeight = 145 + margin;
  const canvasWidth = 702 + margin;

  const minKg = Math.min(...data.map((d) => d[0])) - 1;
  const averageKg = Math.round(averageFunc(data.map((d) => d[0])));
  const maxKg = Math.max(...data.map((d) => d[0])) + 1;

  const minCal = Math.min(...data.map((d) => d[1])) - 1;
  const maxCal = Math.max(...data.map((d) => d[1])) + 1;

  const yScaleKg = d3.scaleLinear(
    [minKg, maxKg],
    [canvasHeight - margin, margin]
  );
  const yScaleCal = d3.scaleLinear(
    [minCal, maxCal],
    [canvasHeight - margin, margin]
  );

  const svgCanvas = d3
    .select(ref)
    .append("svg")
    .attr("width", canvasWidth)
    .attr("height", canvasHeight);

    console.log("Data :");
    console.log(data);

  data.forEach((pair, index) => {
    const [kg, cal] = pair;
    console.log("Pair : " + pair[1]);
    const groupX = index * (2 * barWidth + barPadding + 54);

    //rect pour la sélection(et affichage du tooltip)
    svgCanvas
      .append("rect")
      .attr("x", (groupX - margin / 2) - 14)
      .attr("y", margin)
      .attr("width", (2.5 * barWidth + barPadding) + 28)
      .attr("height", canvasHeight - 2 * margin)
      .attr("fill", "transparent")
      .on("mouseover", function () {
        d3.select(this).attr("fill", "lightgray");

        //Création du tooltip
        const tooltip = svgCanvas.append("g").attr("id", "tooltip");

        const tooltipRect = tooltip
          .append("rect")
          .attr("x", groupX + barWidth - 5)
          .attr("y", margin)
          .attr("width", 39)
          .attr("height", 63)
          .attr("fill", "red");

        //Affichage des valeurs
        tooltip
          .append("text")
          .attr("x", groupX + barWidth + 15)
          .attr("y", margin + 20)
          .attr("fill", "white")
          .attr("font-size", "7px")
          .attr("text-anchor", "middle")
          .text(`${kg}Kg`);

        tooltip
          .append("text")
          .attr("x", groupX + barWidth + 15)
          .attr("y", margin + 45)
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

    //Bar affichant les données
    svgCanvas
      .append("rect")
      .attr("width", barWidth)
      .attr("height", canvasHeight - yScaleKg(kg) - margin)
      .attr("fill", "black")
      .attr("x", groupX)
      .attr("y", yScaleKg(kg));

    svgCanvas
      .append("rect")
      .attr("width", barWidth)
      .attr("height", canvasHeight - yScaleCal(cal) - margin)
      .attr("fill", "red")
      .attr("x", groupX + barWidth + 8)
      .attr("y", yScaleCal(cal));
  });

  const lines = [
    { y: yScaleKg(minKg), label: minKg },
    { y: yScaleKg(averageKg), label: averageKg },
    { y: yScaleKg(maxKg), label: maxKg },
  ];

  lines.forEach((line, index) => {
    svgCanvas
      .append("line")
      .attr("x1", 0)
      .attr("y1", line.y)
      .attr("x2", canvasWidth - margin)
      .attr("y2", line.y)
      .attr("stroke", "gray")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", index === 0 ? "none" : "4");

    svgCanvas
      .append("text")
      .attr("x", canvasWidth - 10)
      .attr("y", line.y + 3)
      .attr("fill", "gray")
      .attr("font-size", "12px")
      .text(line.label);
  });
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
