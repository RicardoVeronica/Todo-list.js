const emptyElement = document.getElementById("lista-tweets");

document.addEventListener("click", init);
document.addEventListener("DOMContentLoaded", localStorageReady);

function init() {
  if (event.target == document.querySelector(".button")) {
    addTweet(event);
  }

  if (event.target == document.querySelector(".borrar-tweet")) {
    deleteTweet(event);
  }
}

function addTweet(event) {
  event.preventDefault();

  const listItem = document.createElement("li");
  const tweet = document.getElementById("tweet").value;
  listItem.innerText = tweet;
  emptyElement.appendChild(listItem);

  const buttonX = document.createElement("a");
  buttonX.textContent = "X";
  buttonX.className = "borrar-tweet";
  listItem.appendChild(buttonX);

  addLocalStorage(tweet);
}

function deleteTweet(event) {
  event.preventDefault();

  if (event.target.className == "borrar-tweet") {
    event.target.parentElement.remove();

    deleteTweetLocalStorage(event.target.parentElement.innerText);
  }
}

function addLocalStorage(tweet) {
  let allTweets;
  allTweets = getLocalStorageItems(); // Toma los tweets como array
  allTweets.push(tweet); // Agrega el nuevo tweet al array de tweets

  // Transforma los items del array a string para almacenar en localStorage
  localStorage.setItem("allTweets", JSON.stringify(allTweets));
}

function getLocalStorageItems() {
  let allTweets;

  // Transforma los tweets de localStorage a un array
  if (localStorage.getItem("allTweets") == null) {
    allTweets = [];
  } else {
    allTweets = JSON.parse(localStorage.getItem("allTweets"));
  }

  return allTweets; // Regresa los tweets como array
}

function localStorageReady() {
  let allTweets;
  allTweets = getLocalStorageItems();
  const tweet = document.getElementById("tweet").value;

  allTweets.forEach(function (tweet) {
    const listItem = document.createElement("li");
    listItem.innerText = tweet;
    emptyElement.appendChild(listItem);

    const buttonX = document.createElement("a");
    buttonX.textContent = "X";
    buttonX.className = "borrar-tweet";
    listItem.appendChild(buttonX);
  });
}

function deleteTweetLocalStorage(tweet) {
  let allTweets, tweetErased;
  tweetErased = tweet.substring(0, tweet.length - 1); // tweet sin X
  allTweets = getLocalStorageItems();

  allTweets.forEach(function (tweet, index) {
    if (tweetErased == tweet) {
      allTweets.splice(index, 1);
    }
  });

  localStorage.setItem("allTweets", JSON.stringify(allTweets));
}
