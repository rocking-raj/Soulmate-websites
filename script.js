let currentSlide = 0;

const slides = document.querySelector(".slides");
const totalSlides = document.querySelectorAll(".slide").length;

/* Slide Controls */
function updateSlide() {
  slides.style.transform = `translateX(-${currentSlide * 100}vw)`;
}

function nextSlide() {
  if (currentSlide < totalSlides - 1) {
    currentSlide++;
    updateSlide();
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateSlide();
  }
}

/* Swipe Support */
let startX = 0;

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  const diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 60) {
    diff > 0 ? nextSlide() : prevSlide();
  }
});

/* Heart Game */
document.addEventListener("DOMContentLoaded", () => {
  const heartsDiv = document.getElementById("hearts");
  if (!heartsDiv) return;

  const items = [
    { type: "text", value: "💌 You are my peace." },
    { type: "text", value: "❤️ My home is with you." },
    { type: "image", value: "photos/s1.jpg" },
    { type: "image", value: "photos/s2.jpg" },
    { type: "image", value: "photos/s3.jpg" }
  ];

  items.sort(() => Math.random() - 0.5);

  items.forEach(item => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "❤️";

    heart.onclick = () => {
      heart.onclick = null;
      heart.innerHTML = "";

      if (item.type === "text") {
        heart.textContent = item.value;
      } else {
        const img = document.createElement("img");
        img.src = item.value;
        heart.appendChild(img);
      }
    };

    heartsDiv.appendChild(heart);
  });
});
