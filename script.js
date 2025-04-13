
const precios = {
  "Margarita": 3000,
  "Pepperoni": 3500,
  "Cuatro Quesos": 4000,
  "Clásica": 2800,
  "Doble Carne": 3500,
  "Vegetariana": 3200,
  "Coca-Cola": 1200,
  "Agua": 1000,
  "Cerveza": 1500
};

let ubicacion = "";

function calcularTotal() {
  let total = 0;
  const pizza = document.getElementById("pizza").value;
  const hamburguesa = document.getElementById("hamburguesa").value;
  const bebida = document.getElementById("bebida").value;

  if (pizza) total += precios[pizza];
  if (hamburguesa) total += precios[hamburguesa];
  if (bebida) total += precios[bebida];

  document.getElementById("total").innerText = "Total: $" + total;
  return total;
}

document.querySelectorAll("select").forEach(sel => {
  sel.addEventListener("change", calcularTotal);
});

function obtenerUbicacion() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      ubicacion = `https://www.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}`;
      document.getElementById("ubicacion-texto").innerText = "Ubicación: compartida ✔️";
    }, () => {
      alert("No se pudo obtener tu ubicación.");
    });
  } else {
    alert("Tu navegador no soporta geolocalización.");
  }
}

function enviarPedido() {
  const nombre = document.getElementById("nombre").value.trim();
  if (!nombre) return alert("Por favor ingresa tu nombre y apellido.");

  const pizza = document.getElementById("pizza").value;
  const hamburguesa = document.getElementById("hamburguesa").value;
  const bebida = document.getElementById("bebida").value;
  const detalles = document.getElementById("detalles").value;
  const total = calcularTotal();

  let mensaje = `Nuevo pedido:%0A`;
  mensaje += `👤 Cliente: ${nombre}%0A`;
  if (pizza) mensaje += `🍕 Pizza: ${pizza}%0A`;
  if (hamburguesa) mensaje += `🍔 Hamburguesa: ${hamburguesa}%0A`;
  if (bebida) mensaje += `🥤 Bebida: ${bebida}%0A`;
  if (detalles) mensaje += `📝 Detalles: ${detalles}%0A`;
  if (ubicacion) mensaje += `📍 Ubicación: ${ubicacion}%0A`;
  mensaje += `💰 Total: $${total}%0A`;
  mensaje += `💸 Alias para transferencia: comidas.rapidas.alias`;

  window.open(`https://wa.me/?text=${mensaje}`, "_blank");
}
