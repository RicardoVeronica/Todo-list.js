// vars
const $form = document.getElementById("formulario");
const $tweetsList = document.getElementById("lista-tweets");
let tweets = [];

// Event listeners
document.addEventListener("submit", addTweet);
document.addEventListener("DOMContentLoaded", () => {
  tweets = JSON.parse(localStorage.getItem("tweets")) || [];
  createHTML();
});

// Functions
function addTweet(e) {
  e.preventDefault();

  // textarea where user writes
  const $userTweet = document.getElementById("tweet").value;

  if ($userTweet === "") {
    showError("Un tweet no puede ir vacio");
    return;
  }

  const tweetObj = {
    id: Date.now(),
    userTweet: $userTweet,
  };

  tweets = [...tweets, tweetObj];

  createHTML();

  $form.reset();
}

function showError(msg) {
  const paragraph = document.createElement("p");
  paragraph.textContent = msg;
  paragraph.setAttribute("class", "error");

  const content = document.getElementById("contenido");
  content.appendChild(paragraph);

  // delete paragraph after 2 seconds
  setTimeout(() => {
    paragraph.remove();
  }, 2000);
}

function createHTML() {
  cleanHTML();

  if (tweets.length > 0) {
    tweets.forEach((element) => {
      const deleteBTN = document.createElement("a");
      deleteBTN.classList.add("borrar-tweet");
      deleteBTN.textContent = "X";
      deleteBTN.onclick = () => {
        deleteTweet(element.id);
      };

      const li = document.createElement("li");
      li.textContent = element.userTweet;
      li.appendChild(deleteBTN);

      $tweetsList.appendChild(li);
    });
  }

  syncStorage();
}

// adds actual tweets to localStorage
function syncStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

function deleteTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  createHTML();
}

function cleanHTML() {
  while ($tweetsList.firstChild) {
    $tweetsList.removeChild($tweetsList.firstChild);
  }
}
