import { useEffect, useRef } from "react";
import * as d3 from "d3";

function Activity(props) {
  const ref = useRef();

  useEffect(() => {
    if (props.data) {
      const data = props.data.sessions;

      const barWidth = 7;
      const barPadding = 10;

      //Fonction de calcul de moyenne (nécessaire pour les labels du graph)
      const averageFunc = (array) =>
        array.reduce((a, b) => a + b) / array.length;

      //Marge pour le graphique
      const margin = { top: 88, right: 90, bottom: 40, left: 43 };
      const canvasHeight = 145 + margin.top + margin.bottom;
      const canvasWidth = 702 + margin.left + margin.right;

      // Correspond a la taille du graphique en lui-même afin d'avoir de la place pour les labels et légendes
      const innerHeight = canvasHeight - margin.top - margin.bottom;

      //Calcul du minimum et maximum pour le calcul de l'échelle
      //Ajout de +1 et -1 pour le min et max pour assurer une taille minimum pour les barres
      const minKg = Math.min(...data.map((d) => d.kilogram)) - 1;
      const averageKg = Math.round(averageFunc(data.map((d) => d.kilogram)));
      const maxKg = Math.max(...data.map((d) => d.kilogram)) + 1;

      const minCal = Math.min(...data.map((d) => d.calories)) - 1;
      const maxCal = Math.max(...data.map((d) => d.calories)) + 1;

      //échelle calculé via innerHeight afin de prendre en compte les marges
      const yScaleKg = d3.scaleLinear([minKg, maxKg], [innerHeight, 0]);

      const yScaleCal = d3.scaleLinear([minCal, maxCal], [innerHeight, 0]);

      //Création du "canvas" (zone de dessin)
      const svgCanvas = d3
        .select(ref.current)
        .append("svg")
        .attr("width", canvasWidth)
        .attr("height", canvasHeight);

      //Titre du graphique
      svgCanvas
        .append("text")
        .attr("fill", "#20253A")
        .attr("y", 24)
        .attr("x", margin.left)
        .text("Activité quotidienne");

      //Position des cercles pour la légende du graphique
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

      //Création d'un group pour le fond (fond gris lors ed la sélection) et pour les lignes de fonds
      //Pour éviter soucis d'affichage (ex : rect de fond qui se dessine par-dessus les lignes)
      const selectBgGroup = svgCanvas.append("g");

      const backgroundGroup = svgCanvas.append("g").attr("class", "background");

      data.forEach((pair, index) => {
        const kg = pair.kilogram;
        const cal = pair.calories;

        //Calcul de la position sur l'axe X
        const groupX = margin.left + index * (2 * barWidth + barPadding + 54);

        const tooltipX = groupX + 39 + 7; // Position X de la tooltip

        // Rect pour la sélection(et affichage du tooltip)
        selectBgGroup
          .append("rect")
          .attr("x", () => {
            if (index === 0) {
              return groupX;
            } else {
              return groupX - 14;
            }
          })
          .attr("y", margin.top - 2)
          .attr("width", () => {
            if (index === 0) {
              return 2.5 * barWidth + barPadding + 14;
            } else {
              return 2.5 * barWidth + barPadding + 28;
            }
          })
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

            // Suppression du tooltip lorsqu'on retirer la souris
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

      //Position et valeurs a afficher pour les lignes
      const lines = [
        { y: yScaleKg(minKg), label: minKg },
        { y: innerHeight / 2, label: averageKg },
        { y: yScaleKg(maxKg), label: maxKg },
      ];

      lines.forEach((line, index) => {
        //Ajout des lignes dans le backgroundGroup pour s'arrurer qu'elle s'affiche dérriére les barres
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

      return () => {
        d3.select(ref.current).selectAll("*").remove();
      };
    }
  },);

  if (props.data) {
    return <svg className="barchart" ref={ref}></svg>;
  } else {
    return (
      <div className="nodata">
        <p>Aucune données</p>
      </div>
    );
  }
}

export default Activity;
