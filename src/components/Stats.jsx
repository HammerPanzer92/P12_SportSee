import { StatElement } from "./StatElement";

export function Stats(props) {
  //Si on a des stats, alors on les affichent via des components StatElement, sinon on affiche juste un message
  if (props.stats) {
    return (
      <div className="stats_container">
        {Object.entries(props.stats).map(([key, value]) => {
          return <StatElement type={key} key={key} quantity={value} />;
        })}
      </div>
    );
  } else {
    return (
      <div className="nodata">
        <p>Aucune données</p>
      </div>
    );
  }
}
