import { useEffect, useState } from "react";
import Activity from "./components/Activity";
import Greetings from "./components/Greetings";
import KpiGraph from "./components/Kpi";
import Navbar from "./components/Navbar";
import RadarChart from "./components/RacharChart";
import Sessions from "./components/Sessions";
import Sidebar from "./components/Sidebar";
import { Stats } from "./components/Stats";
import "./SCSS/styles.scss";

//Fonctions de la vraie API
import {
  getActivityById,
  getAverageById,
  getPerformanceById,
  getUserInfo,
} from "./services/api";

//Fonctions de l'API mocké
import {
  getMockUserById,
  getMockUserActivityById,
  getMockUserAverageSession,
  getMockUserPerformance,
} from "./services/mockApi";

function App() {
  const [userData, setDataUser] = useState(null);
  const [activityData, setActivityData] = useState(null);
  const [sessionsData, setSessionsData] = useState(null);
  const [performanceData, setPerformanceData] = useState(null);

  useEffect(() => {
    getUserInfo(12)
      .then((data) => setDataUser(data))
      .catch((err) => console.error(err));

    getActivityById(12)
      .then((data) => setActivityData(data))
      .catch((err) => console.error(err));

    getAverageById(12)
      .then((data) => setSessionsData(data))
      .catch((err) => console.error(err));

    getPerformanceById(12)
      .then((data) => setPerformanceData(data))
      .catch((err) => console.error(err));
  }, []);

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
            <Activity data={activityData ? activityData : null} />
            <div className="small_graph_container">
              <Sessions data={sessionsData ? sessionsData : null} />
              <div className="graph_div">
                <RadarChart
                  data={performanceData ? performanceData : null}
                  levels={5}
                  maxValue={250}
                />
              </div>
              <div className="graph_div">
                <KpiGraph
                  value={userData ? userData.score * 100 : 0}
                  size={200}
                />
              </div>
            </div>
          </div>
          <Stats
            stats={
              userData
                ? userData.keyData
                : {
                    calorieCount: 0,
                    proteinCount: 0,
                    carbohydrateCount: 0,
                    lipidCount: 0,
                  }
            }
          />
        </div>
      </div>
    </main>
  );
}

export default App;
