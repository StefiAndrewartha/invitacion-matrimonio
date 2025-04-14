const countDownDate = new Date("Sep 12, 2025 11:00:00").getTime();

const x = setInterval(function () {
  const now = new Date().getTime();
  const distance = countDownDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("countdown").innerHTML =
    `${days} días ${hours}h ${minutes}m ${seconds}s`;

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "¡Ya llegó el gran día!";
  }
}, 1000);

const form = document.getElementById("form-asistencia");
const popup = document.getElementById("mensaje-popup");
const popupTexto = document.getElementById("popup-mensaje-texto");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    nombre: form.nombre.value,
    email: form.email.value,
    mensaje: form.mensaje.value,
  };

  fetch(form.action, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        enviarAGoogleSheets(data.nombre, data.email, data.mensaje);
        form.reset();
        mostrarPopup("¡Gracias por confirmar tu asistencia! 💌", false);
      } else {
        response.json().then((data) => {
          mostrarPopup(data.error || "Ocurrió un error al enviar. Inténtalo nuevamente.", true);
        });
      }
    })
    .catch(() => {
      mostrarPopup("Hubo un problema de red. Intenta más tarde.", true);
    });
});

function mostrarPopup(mensaje, esError) {
  popupTexto.textContent = mensaje;
  popup.classList.toggle("error", esError);
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 5000);
}

function enviarAGoogleSheets(nombre, email, mensaje) {
  const formData = new FormData();
  formData.append("entry.22308715", nombre);
  // Agrega estos campos si los has creado en tu Google Form:
  // formData.append("entry.xxxxxxxx", email);
  // formData.append("entry.xxxxxxxx", mensaje);

  fetch("https://docs.google.com/forms/d/e/1FAIpQLSd4UYTz0P7Jpp-AUjWseFpbSNMlDAC2rVlNUkvO6acuIm_x7g/formResponse", {
    method: "POST",
    mode: "no-cors",
    body: formData,
  });
}
