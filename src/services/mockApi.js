import * as data from "./mockData";

export async function getMockUserById(id) {
  const result = data.USER_MAIN_DATA.filter((user) => user.id === id).shift();

  if (result.todayScore) {
    result.score = result.todayScore;
  }

  return result;
}

export async function getMockUserActivityById(id) {
  const result = data.USER_ACTIVITY.filter(
    (data) => data.userId === id
  ).shift();
  console.log("activity :");
  console.log(result);
  return result;
}

export async function getMockUserAverageSession(id) {
  const result = data.USER_AVERAGE_SESSIONS.filter(
    (data) => data.userId === id
  ).shift();
  console.log("session : ");
  console.log(result);
  return result;
}

export async function getMockUserPerformance(id) {
  const result = data.USER_PERFORMANCE.filter(
    (data) => data.userId === id
  ).shift();
  return result;
}
