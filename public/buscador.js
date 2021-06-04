

mostrar();
let localMenus = []

function mostrar() {
  fetch("/compras/mostrarProductos")
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      datos.error
        ? (document.getElementById(
            "feedback"
          ).innerHTML = `<h4>Ha ocurrido un fallo</h4>`)
        :  imprimir(datos), (localMenus= datos.contenido)
    });
}

function mostrarProducto() {
  fetch("/compras/mostrarProducto", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      zapatillas: document.getElementById("zapatillas").value,
    }),
  }).then(function(respuesta){
    return respuesta.json()
    
  }).then(function(datos){
    datos.error
    ? (document.getElementById(
        "feedback"
      ).innerHTML = `<h4>Ha ocurrido un fallo</h4>`)
    : (document.getElementById(
        "feedback"
      ).innerHTML = `<h4>Todo correcto</h4>`),
    imprimir(datos);
  })

}

function imprimir(datos) {
  let parrafo = "";
  for (let i = 0; i < datos.contenido.length; i++) {
    parrafo += `<tr><td>${datos.contenido[i].zapatillas}</td><td>${datos.contenido[i].precio} $</td><td><button onclick="editarProducto(${i})">copia los datos</button></td><td><button onclick="borrarProducto(${i})">borre el producto</button></td></tr>`;
  }
  document.getElementById(
    "contenido"
  ).innerHTML = `<table><th>zapatillas:</th><th>precio:</th><th>editar producto</th><th>borrar producto</th>${parrafo}</table>`;
}

function anyadirProducto() {
  fetch("/compras/anyadirProducto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      zapatillas: document.getElementById("zapatillas").value,
      precio: document.getElementById("precio").value,
    }),
  })
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {
      datos.contenido.insertedCount >= 1
        ? ((document.getElementById(
            "feedback"
          ).innerHTML = `<h4>añadido correctamente</h4>`),
          mostrar())
        : (document.getElementById(
            "feedback"
          ).innerHTML = `<h4>No se ha añadido correctamente</h4>`);
    });
}

function editarProducto(indice){
  document.getElementById("zapatillas").value = localMenus[indice].zapatillas,
  document.getElementById("precio").value = localMenus[indice].precio
}

function editarFinal(){

  fetch("/compras/modificarProducto", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      zapatillas: document.getElementById("zapatillas").value,
      precio: document.getElementById("precio").value
    })
  }).then(function(respuesta){
    return respuesta.json()
  }).then(function(datos){
    datos.contenido.modifiedCount >= 1
        ? ((document.getElementById(
            "feedback"
          ).innerHTML = `<h4>editado correctamente</h4>`),
          mostrar())
        : (document.getElementById(
            "feedback"
          ).innerHTML = `<h4>No se ha editado correctamente</h4>`);
  })
}

function borrarProducto(){

  fetch("/compras/eliminarProducto", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      zapatillas: document.getElementById("zapatillas").value
    })
  }).then(function(respuesta){
    return respuesta.json()
  }).then(function(datos){
    datos.contenido.deletedCount >= 1
        ? ((document.getElementById(
            "feedback"
          ).innerHTML = `<h4>borrado correctamente</h4>`),
          mostrar())
        : (document.getElementById(
            "feedback"
          ).innerHTML = `<h4>No se ha borrado correctamente</h4>`);
  })
}
