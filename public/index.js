
mostrarUsuario()
function mostrarUsuario(){
  fetch("/users/usuarios").then(function (respuesta) {
    return respuesta.json();
  })
  .then(function (datos) {
    datos.error
    ? document.getElementById("feedback2").innerHTML=`<h4>Ha ocurrido un fallo</h4>`
    : imprimirUsuario(datos)
  });
}

function imprimirUsuario(datos){
    let parrafo = "";
    for (let i = 0; i < datos.contenido.length; i++) {
      parrafo += `<tr><td>${datos.contenido[i].user}</td><td>${datos.contenido[i].mail}</td><td>${datos.contenido[i].password}</td></tr>`;
    }
    document.getElementById(
      "contenidoUsuario"
    ).innerHTML = `<table><th>usuario:</th><th>mail:</th><th>contraseña</th>${parrafo}</table>`;
}

function anyadirUsuario() {
  fetch("/users/anyadirUsuario",{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mail: document.getElementById("mail").value,
      password: document.getElementById("password").value,
      user: document.getElementById("user").value,
    })
  } )
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      datos.error
      ? document.getElementById("feedback2").innerHTML=`<h4>No se ha añadido correctamente</h4>`
      : (document.getElementById("feedback2").innerHTML= `<h4>${datos.contenido.mensaje}</h4>`, mostrarUsuario())
    });
}
