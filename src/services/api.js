async function fetchApiJson(url) {
  var result = null;

  await fetch(url, { method: "GET" })
    .then((response) => {
      //Les données sont dans un ReadableStream, cette fonction stocke les données dans un JSON
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let result = "";

      return reader.read().then(function processText({ done, value }) {
        if (done) {
          return JSON.parse(result);
        }

        result += decoder.decode(value, { stream: true });
        return reader.read().then(processText);
      });
    })
    .then((data) => {
      result = data;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  if (result.data) {
    return result.data;
  } else {
    return false;
  }
}

export async function getUserInfo(id) {
  var result = false;
  const url = `http://localhost:3000/user/${id}`;

  await fetchApiJson(url)
    .then((data) => (result = data))
    .catch((error) => {
      console.error(error);
    });

  if (result.todayScore) {
    result.score = result.todayScore;
  }

  console.log("FETCH USER");
  console.log(result);

  return result;
}

export async function getActivityById(id) {
  var result = false;
  const url = `http://localhost:3000/user/${id}/activity`;

  await fetchApiJson(url)
    .then((data) => (result = data))
    .catch((error) => {
      console.error(error);
    });

  if (result.todayScore) {
    result.score = result.todayScore;
  }

  console.log("FETCH ACTIVITY");
  console.log(result);

  return result;
}

export async function getAverageById(id) {
  var result = false;
  const url = `http://localhost:3000/user/${id}/average-sessions`;

  await fetchApiJson(url)
    .then((data) => (result = data))
    .catch((error) => {
      console.error(error);
    });

  if (result.todayScore) {
    result.score = result.todayScore;
  }

  console.log("FETCH AVERAGE");
  console.log(result);

  return result;
}

export async function getPerformanceById(id) {
  var result = false;
  const url = `http://localhost:3000/user/${id}/performance`;

  await fetchApiJson(url)
    .then((data) => (result = data))
    .catch((error) => {
      console.error(error);
    });

  if (result.todayScore) {
    result.score = result.todayScore;
  }

  console.log("FETCH PERFORMANCE");
  console.log(result);

  return result;
}