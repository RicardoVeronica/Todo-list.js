// vars
const $form = document.getElementById("formulario");
const $tweetsList = document.getElementById("lista-tweets");
let tweets = [];

// Event listeners
document.addEventListener("submit", addTweet);

// Functions
function addTweet(e) {
  e.preventDefault();

  // textarea where user writes
  const $userTweet = document.getElementById("tweet").value;

  if ($userTweet === "") showError("Un tweet no puede ir vacio");
  return;
}

function showError(msg) {
  const paragraph = document.createElement("p");
  paragraph.textContent = msg;
  paragraph.setAttribute("class", "error");

  const content = document.getElementById("contenido");
  content.appendChild(paragraph);
}
