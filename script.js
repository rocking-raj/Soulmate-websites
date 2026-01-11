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
/* 🎶 MUSIC CONTROL */
const bgMusic = document.getElementById("bgMusic");

function playMusic() {
  if (!bgMusic) return;
  bgMusic.volume = 0.5;
  bgMusic.play().catch(() => {});
}

function stopMusic() {
  if (!bgMusic) return;
  bgMusic.pause();
}

/* 💍 PROPOSAL */
function sayYes() {
  alert("She said YES 💍❤️");
}

/* 😄 NO button runs away */
const noBtn = document.getElementById("noBtn");
if (noBtn) {
  noBtn.addEventListener("mouseenter", () => {
    noBtn.style.transform =
      `translate(${Math.random() * 80 - 40}px, ${Math.random() * 60 - 30}px)`;
  });
}

/* 🌙 NIGHT THEME + MUSIC ON LAST SLIDE */
const originalUpdateSlide = updateSlide;
updateSlide = function () {
  originalUpdateSlide();

  if (currentSlide === totalSlides - 1) {
    document.body.classList.add("night");
    playMusic();
  } else {
    document.body.classList.remove("night");
    stopMusic();
  }
};

