function loadJson(url) {
  return fetch(url)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(response.status);
      }
    })
}

loadJson('no-such-user.json') // (3)
  .catch(alert); // Error: 404



// используя async/await вместо .then/catch

// async function loadJson(url) {
//   const response = await fetch(url);

//       if (response.status == 200) {
//         return await response.json();
//       } else {
//         await Promise.reject(new Error(response.status));
        
//         // либо выбросить ошибку с помощью
//         // throw new Error(response.status);
//       }
// }

// loadJson('no-such-user.json').catch(alert)

