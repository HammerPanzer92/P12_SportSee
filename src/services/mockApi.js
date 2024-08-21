import * as data from "./mockData";

export function test(){
    console.log("Data :");
    console.log(data);
}

export async function getUserById(id) {
  const result = data.USER_MAIN_DATA.filter((user) => user.id === id).shift();
  return result;
}

export async function getUserActivityById(id) {
  const result = data.USER_ACTIVITY.filter(
    (data) => data.userId === id
  ).shift();
  console.log("activity :");
  console.log(result);
  return result;
}

export async function getUserAverageSession(id) {
  const result = data.USER_AVERAGE_SESSIONS.filter(
    (data) => data.userId === id
  ).shift();
  console.log("session : ");
  console.log(result);
  return result;
}

export async function getUserPerformance(id) {
  const result = data.USER_PERFORMANCE.filter(
    (data) => data.userId === id
  ).shift();
  return result;
}
