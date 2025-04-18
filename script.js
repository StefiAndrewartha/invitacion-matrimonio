// script.js
document.addEventListener("DOMContentLoaded", function () {
  const countdown = document.getElementById("countdown");
  const targetDate = new Date("2025-09-12T11:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      countdown.innerHTML = "¡Ya comenzó el gran día! 🎉";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdown.innerHTML = `${days} días ${hours} horas ${minutes} min ${seconds} seg`;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
});
