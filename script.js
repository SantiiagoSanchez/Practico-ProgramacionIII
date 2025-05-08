const apiKey = "348411271418cb0b6e2f4bdcd27010f7";

function buscarClima() {
  // Obtener el valor del input
    const ciudad = document.getElementById("ciudadInput").value;

  // Validar que se haya ingresado algo
    if (ciudad === "") {
    mostrarMensaje("Por favor, ingresa una ciudad.");
    return;
}

  // Construir la URL de la API
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;;

  // Hacer la petición con fetch()
    fetch(url)
    .then(respuesta => {
        if (!respuesta.ok) {
        throw new Error("Ciudad no encontrada");
        }
        return respuesta.json();
    })
    .then(data => {
        mostrarClima(data);
    })
    .catch(error => {
        mostrarMensaje("No se pudo obtener el clima. Verifica el nombre de la ciudad.");
        console.error(error);
    });
}

// Función para mostrar los datos del clima
function mostrarClima(data) {
    const contenedor = document.getElementById("resultado");

  // Obtener datos necesarios
    const nombre = data.name;
    const temperatura = Math.round(data.main.temp);
    const descripcion = data.weather[0].description;
    const icono = data.weather[0].icon;

  // Armar el HTML a mostrar
    contenedor.innerHTML = `
    <h2>${nombre}</h2>
    <p>Clima: ${descripcion}</p>
    <p>Temperatura: ${temperatura}°C</p>
    <img src="https://openweathermap.org/img/wn/${icono}@2x.png" alt="${descripcion}">
    `;
}

// Función para mostrar errores o mensajes
function mostrarMensaje(msg) {
    const contenedor = document.getElementById("resultado");
    contenedor.innerHTML = `<p style="color: red;">${msg}</p>`;
}

// Agregar evento al botón
document.getElementById("btnBuscar").addEventListener("click", buscarClima);