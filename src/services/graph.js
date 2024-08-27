import * as d3 from "d3";

/**
 * Génére un graphiqque en bar dans l'élément ref
 * @param {Array<Number>} data Tableau des données du graphique
 * @param {*} ref L'élément html dans lequel afficher le graphiquer
 */
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

  const minKg = Math.min(...data.map((d) => d.kilogram)) - 1;
  const averageKg = Math.round(averageFunc(data.map((d) => d.kilogram)));
  const maxKg = Math.max(...data.map((d) => d.kilogram)) + 1;

  const minCal = Math.min(...data.map((d) => d.calories)) - 1;
  const maxCal = Math.max(...data.map((d) => d.calories)) + 1;

  const yScaleKg = d3.scaleLinear([minKg, maxKg], [innerHeight, 0]);

  const yScaleCal = d3.scaleLinear([minCal, maxCal], [innerHeight, 0]);

  const svgCanvas = d3
    .select(ref)
    .append("svg")
    .attr("width", canvasWidth)
    .attr("height", canvasHeight);

  svgCanvas
    .append("text")
    .attr("fill", "#20253A")
    .attr("y", 24)
    .attr("x", margin.left)
    .text("Activité quotidienne");

  const circleBlackX = 536;
  const circleY = 18;

  svgCanvas
    .append("circle")
    .attr("r", 4)
    .attr("cx", circleBlackX)
    .attr("cy", circleY)
    .attr("fill", "#282D30");

  svgCanvas
    .append("text")
    .attr("y", 24)
    .attr("x", circleBlackX + 10)
    .text("Poids (kg)")
    .attr("fill", "#74798C");

  svgCanvas
    .append("circle")
    .attr("r", 4)
    .attr("cx", circleBlackX + 110)
    .attr("cy", circleY)
    .attr("fill", "#E60000");

  svgCanvas
    .append("text")
    .attr("y", 24)
    .attr("x", circleBlackX + 122)
    .text("Calories brûlées (kCal)")
    .attr("fill", "#74798C");

  // Dimensions de la tooltip
  const tooltipWidth = 39;
  const tooltipHeight = 63;
  const tooltipY = margin.top - 50; // Position Y de la tooltip

  const selectBgGroup = svgCanvas.append("g");

  const backgroundGroup = svgCanvas.append("g").attr("class", "background");

  data.forEach((pair, index) => {
    const kg = pair.kilogram;
    const cal = pair.calories;
    const groupX = margin.left + index * (2 * barWidth + barPadding + 54);

    const tooltipX = groupX + 39 + 7; // Position X de la tooltip

    // Rect pour la sélection(et affichage du tooltip)
    selectBgGroup
      .append("rect")
      .attr("x", groupX - 14)
      .attr("y", margin.top - 2)
      .attr("width", 2.5 * barWidth + barPadding + 28)
      .attr("height", innerHeight + 2)
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

  const lines = [
    { y: yScaleKg(minKg), label: minKg },
    { y: innerHeight / 2, label: averageKg },
    { y: yScaleKg(maxKg), label: maxKg },
  ];

  lines.forEach((line, index) => {
    backgroundGroup
      .append("line")
      .attr("x1", margin.left)
      .attr("y1", line.y + margin.top)
      .attr("x2", canvasWidth - margin.right)
      .attr("y2", line.y + margin.top)
      .attr("stroke", "gray")
      .attr("stroke-width", 1)
      .attr("stroke-dasharray", index === 0 ? "none" : "4");

    backgroundGroup
      .append("text")
      .attr("x", canvasWidth - margin.right + 10)
      .attr("y", line.y + 3 + margin.top)
      .attr("fill", "gray")
      .attr("font-size", "12px")
      .text(line.label);
  });
}

export function drawCurveChart(data, ref) {
  ref.innerHTML = "";

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
  const xScale = d3.scaleLinear(
    [xMin, xMax],
    [0, canvasWidth]
  );
  
  const yScale = d3.scaleLinear(
    [0, yMax],
    [canvasHeight - margin.bottom, margin.top]
  );

  const svgCanvas = d3
    .select(ref)
    .append("svg")
    .attr("width", canvasWidth)
    .attr("height", canvasHeight)
    .attr("class", "sessionchart")
    .style("background", "#FF0000");
  
  const bgRect = svgCanvas.append("rect")
  .attr("width", canvasWidth)
  .attr("height", canvasHeight)
  .style("fill","#000000")
  .style("opacity", 0.0975)
  .attr("y",0)
  .attr("x",canvasWidth);
  
  // Create gradient for the curve
  const defs = svgCanvas.append("defs");

  const gradient = defs
    .append("linearGradient")
    .attr("id", "gradient")
    .attr("x1", "100%")
    .attr("x2", "0%")
    .attr("y1", "0%")
    .attr("y2", "0%");

  gradient.append("stop").attr("offset", "1.19%").attr("stop-color", "#FFFFFF");

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
    .select(ref)
    .append("div")
    .style("position", "absolute")
    .style("visibility", "hidden")
    .style("background", "black")
    .style("color", "white")
    .style("padding", "5px")
    .style("border-radius", "5px")
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
}
