import { useState } from "react";
import Activity from "./components/Activity";
import Greetings from "./components/Greetings";
import KpiGraph from "./components/Kpi";
import Navbar from "./components/Navbar";
import RadarChart from "./components/RacharChart";
import Sessions from "./components/Sessions";
import Sidebar from "./components/Sidebar";
import "./SCSS/styles.scss";

import { getUserActivityById, getUserAverageSession, getUserById, getUserPerformance, test } from "./services/mockApi";

function App() {
  const [userData, setDataUser] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const [sessionsData, setSessionsData] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);

  test();

  getUserById(12)
    .then((data) => setDataUser(data))
    .catch((err) => console.error(err));

  getUserActivityById(12)
    .then((data) => setActivityData(data))
    .catch((err) => console.error(err));

  getUserAverageSession(12)
    .then((data) => setSessionsData(data))
    .catch((err) => console.error(err));

  getUserPerformance(12)
    .then((data) => setPerformanceData(data))
    .catch((err) => console.error(err));

  return (
    <main id="dashboard">
      <Navbar />
      <div className="container">
        <Sidebar />
        <div className="data_container">
          <Greetings firstName={userData ? userData.userInfos.firstName : ""} />
          <p className="objectif">
            Félicitation ! Vous avez explosé vos objectifs hier 👏
          </p>
          <div className="graph_container">
            <Activity data={activityData ? activityData : null}/>
            <div className="small_graph_container">
              <Sessions data={sessionsData ? sessionsData : null} />
              <div className="graph_div">
                <RadarChart data={performanceData ? performanceData : null} levels={5} maxValue={250} />
              </div>
              <div className="graph_div">
                <KpiGraph value={userData ? userData.todayScore * 100 : 0} size={200} />
              </div>
            </div>
          </div>
          <div className="stats_container"></div>
        </div>
      </div>
    </main>
  );
}

export default App;
