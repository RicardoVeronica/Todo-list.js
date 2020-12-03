const boton = document.querySelector('.button')
// Remover evento despues de la accion
// boton.addEventListener('click', helloWorld)

// function helloWorld(e) {
    // console.log('hello world')
    // remover evento despues de click
    // boton.removeEventListener('click', helloWorld)
// }

// funcion con parametros
function saludar(name='Desconocido') {
    console.log(`hello ${name}`)
}

// paradigma funcional para pasarle parametros
// boton.addEventListener('click', function() {
//     saludar('Ricardo')
// }) 

// con arrow function
boton.addEventListener('click', () => saludar('Ricardo'))
