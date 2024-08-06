import Activity from "./components/Activity";
import Greetings from "./components/Greetings";
import Navbar from "./components/Navbar";
import RadarChart from "./components/RacharChart";
import Sessions from "./components/Sessions";
import Sidebar from "./components/Sidebar";
import "./SCSS/styles.scss";

function App() {

  const data = [
    { axis: 'Axis 1', value: 5 },
    { axis: 'Axis 2', value: 4 },
    { axis: 'Axis 3', value: 3 },
    { axis: 'Axis 4', value: 2 },
    { axis: 'Axis 5', value: 4 },
    { axis: 'Axis 6', value: 3 },
  ];

  return (
    <main id="dashboard">
      <Navbar />
      <div className="container">
        <Sidebar />
        <div className="data_container">
          <Greetings />
          <p className="objectif">
            Félicitation ! Vous avez explosé vos objectifs hier 👏
          </p>
          <div className="graph_container">
            <Activity/>
            <Sessions/>
            <RadarChart data={data} levels={5} maxValue={5} />
          </div>
          <div className="stats_container"></div>
        </div>
      </div>
    </main>
  );
}

export default App;
