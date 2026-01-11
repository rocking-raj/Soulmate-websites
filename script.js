let currentSlide = 0;

const slides = document.querySelector(".slides");
let totalSlides;
document.addEventListener("DOMContentLoaded", () => {
  totalSlides = document.querySelectorAll(".slide").length;
});


/* SLIDER */
function updateSlide() {
  slides.style.transform = `translateX(-${currentSlide * 100}vw)`;

  if (currentSlide === totalSlides - 1) {
    document.body.classList.add("night");
    playMusic();
    startFloatingHearts();

    const ft = document.getElementById("finalText");
    if (ft && !ft.dataset.done) {
      ft.dataset.done = "1";
      typeText(ft, "I choose you. Today. Tomorrow. Always. ❤️");
    }
  } else {
    document.body.classList.remove("night");
    stopMusic();
    stopFloatingHearts();
  }
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

/* Swipe */
let startX = 0;
document.addEventListener("touchstart", e => startX = e.touches[0].clientX);
document.addEventListener("touchend", e => {
  const diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 60) diff > 0 ? nextSlide() : prevSlide();
});

/* Heart Game */
document.addEventListener("DOMContentLoaded", () => {
  const heartsDiv = document.getElementById("hearts");

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
  heart.innerHTML = `<span>${item.value}</span>`;
}
      } else {
        const img = document.createElement("img");
        img.src = item.value;
        heart.appendChild(img);
      }
    };

    heartsDiv.appendChild(heart);
  });
});

/* Typewriter */
function typeText(el, text) {
  let i = 0;
  el.textContent = "";
  const timer = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) clearInterval(timer);
  }, 60);
}

/* Proposal */
function sayYes() {
  fireworks();
  document.getElementById("passwordBox").style.display = "block";
}

/* Password */
function checkPassword() {
  const input = document.getElementById("password");
  const msg = document.getElementById("secretMessage");
  const wrong = document.getElementById("wrong");

  if (input.value === "12:17") {
    msg.style.display = "block";
    wrong.textContent = "";
    fireworks();
  } else {
    wrong.textContent = "Wrong password 😄";
  }
}

/* NO button */
const noBtn = document.getElementById("noBtn");
if (noBtn) {
  noBtn.addEventListener("mouseenter", () => {
    noBtn.style.transform =
      `translate(${Math.random() * 80 - 40}px, ${Math.random() * 60 - 30}px)`;
  });
}

/* Fireworks */
function fireworks() {
  for (let i = 0; i < 25; i++) {
    const f = document.createElement("div");
    f.className = "firework";
    f.style.left = Math.random() * 100 + "vw";
    f.style.top = Math.random() * 100 + "vh";
    document.body.appendChild(f);
    setTimeout(() => f.remove(), 1200);
  }
}

/* Floating Hearts */
let heartInterval = null;
function startFloatingHearts() {
  if (heartInterval) return;
  heartInterval = setInterval(() => {
    const h = document.createElement("div");
    h.className = "floating-heart";
    h.textContent = "❤️";
    h.style.left = Math.random() * 100 + "vw";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 6000);
  }, 400);
}

function stopFloatingHearts() {
  clearInterval(heartInterval);
  heartInterval = null;
}

/* Music */
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


