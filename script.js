const countdown = document.getElementById("countdown");
const weddingDate = new Date("2025-09-12T11:00:00").getTime();

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / 1000 / 60) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  countdown.innerHTML = `${days} días, ${hours}h ${minutes}m ${seconds}s`;

  if (distance < 0) {
    countdown.innerHTML = "¡Ya estamos casadas!";
  }
};

setInterval(updateCountdown, 1000);
