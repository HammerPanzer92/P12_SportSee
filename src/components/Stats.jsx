import { StatElement } from "./StatElement";

export function Stats(props) {
  console.log("STATS PROPS");
  console.log(props);

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
