import Activity from "./components/Activity";
import Greetings from "./components/Greetings";
import Navbar from "./components/Navbar";
import Sessions from "./components/Sessions";
import Sidebar from "./components/Sidebar";
import "./SCSS/styles.scss";

function App() {
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
          </div>
          <div className="stats_container"></div>
        </div>
      </div>
    </main>
  );
}

export default App;
