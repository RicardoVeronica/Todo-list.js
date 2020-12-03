// Variables
// Div vacio donde ira la lista de tweets
const listaTweets = document.getElementById("lista-tweets");

// Iniciar Event Listeners
function eventListeners() {
  document.getElementById("formulario").addEventListener("submit", addTweet);

  // Borrar tweets
  listaTweets.addEventListener("click", borrarTweet);

  // contenido cargado
  document.addEventListener("DOMContentLoaded", localSotrageListo);
}

eventListeners();

// Funciones
// Agregar tweet al DOM
function addTweet(event) {
  event.preventDefault();

  // leer el valor de la caja de formulario del txtarea
  const tweet = document.getElementById("tweet").value;

  // crear un boton para borrar cada tweet con un anchor
  const botonBorrar = document.createElement("a");
  botonBorrar.classList = "borrar-tweet";
  botonBorrar.innerText = "X";

  // crear elementos li para guardar los tweets
  const li = document.createElement("li");
  // el valor de la caja de formulario se agrega como li
  li.innerText = tweet;
  // agregamos el botonBorrar en el li
  li.appendChild(botonBorrar);
  // agregamos al div vacio el nuevo li con el contenido de la caja del form
  listaTweets.appendChild(li);

  // Agregar al localSotrage
  agregarTweetLocalStorage(tweet);
}

// Eliminar tweet
function borrarTweet(event) {
  event.preventDefault();

  if (event.target.className == "borrar-tweet") {
    event.target.parentElement.remove(); // elimina el padre de a que es li
    borrarTweetLocalStorage(event.target.parentElement.innerText);
  }
}

// Mostrar datos de localSotrage en la lista
function localSotrageListo() {
  let tweets;
  tweets = obtenerTweetsLocalStorage();

  console.log(tweets);

  tweets.forEach(function (tweet) {
    // crear un boton para borrar cada tweet con un anchor
    const botonBorrar = document.createElement("a");
    botonBorrar.classList = "borrar-tweet";
    botonBorrar.innerText = "X";

    // crear elementos li para guardar los tweets
    const li = document.createElement("li");
    // el valor de la caja de formulario se agrega como li
    li.innerText = tweet;
    // agregamos el botonBorrar en el li
    li.appendChild(botonBorrar);
    // agregamos al div vacio el nuevo li con el contenido de la caja
    listaTweets.appendChild(li);
  });
}

// Agregar tweet al localSotrage
function agregarTweetLocalStorage(tweet) {
  let tweets;
  tweets = obtenerTweetsLocalStorage();

  // agregar nuevo tweet al local storage al final del arreglo
  tweets.push(tweet);
  // Convertir de string a arreglo para local storage
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

// comprueba que existan elementos en localSotrage y regresa un arreglo
function obtenerTweetsLocalStorage() {
  let tweets;

  if (localStorage.getItem("tweets") == null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem("tweets"));
  }

  return tweets;
}

// Eliminar tweet localSotrage
function borrarTweetLocalStorage(tweet) {
  let tweets, tweetBorrar;

  // Elimina la x del tweet
  tweetBorrar = tweet.substring(0, tweet.length - 1);

  tweets = obtenerTweetsLocalStorage();

  tweets.forEach(function (tweet, index) {
    if (tweetBorrar == tweet) {
      tweets.splice(index, 1);
    }
  });

  localStorage.setItem("tweets", JSON.stringify(tweets));
}
