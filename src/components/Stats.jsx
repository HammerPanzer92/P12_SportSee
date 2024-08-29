import { StatElement } from "./StatElement";

export function Stats(props) {

    console.log("STATS PROPS");
    console.log(props);

  return <div className="stats_container">
    {Object.entries(props.stats).map(([key, value])=> {
        return <StatElement type={key} key={key} quantity={value} />
    })}
  </div>;
}
