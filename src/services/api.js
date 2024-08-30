/**
 * Envoie une requête sur l'URL donné en parametre et retourne le résultat
 * 
 * @param {string} url URL où faire la demande
 * @returns Un objet contenant les données de la réponse de la requête
 */
async function fetchApiJson(url) {
  var result = null;

  await fetch(url, { method: "GET" })
    .then((response) => {
      //Les données sont dans un ReadableStream, cette fonction stocke les données dans un JSON
      //En utilisant le Reader du stream et un textdecoder pour récupéré les données
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

/**
 * Récupére les données d'un utilisateur depuis le backend
 * 
 * @param {int} id L'identifiant de l'utilisateur
 * @returns Un objet contenant les données de l'utilisateur
 */
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

/**
 * Récupére les données d'activité d'un utilisateur depuis le backend
 * 
 * @param {int} id L'identifiant de l'utilisateur
 * @returns Un objet contenant les données d'activité de l'utilisateur
 */
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

/**
 * Récupére les durées moyenne de sessions d'un utilisateur depuis le backend
 * 
 * @param {int} id L'identifiant de l'utilisateur
 * @returns Un objet contenant les durées moyenne de l'utilisateur
 */
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

/**
 * Récupére les données de performance d'un utilisateur depuis le backend
 * 
 * @param {int} id L'identifiant de l'utilisateur
 * @returns Un objet contenant les données d'activité de l'utilisateur
 */
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