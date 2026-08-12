const clock = document.getElementById("clock");
const storyCard = document.getElementById("storyCard");
const storyText = document.getElementById("storyText");
const closeStory = document.getElementById("closeStory");
const hotspots = document.querySelectorAll(".hotspot");
const soundBtn = document.getElementById("soundBtn");

function updateClock() {
  const now = new Date();
  const h = now.getHours();
  const m = String(now.getMinutes()).padStart(2, "0");
  const display = h === 0 ? 12 : (h > 12 ? h - 12 : h);
  clock.textContent = `${display}:${m} ${h >= 12 ? "PM" : "AM"}`;
}
updateClock();
setInterval(updateClock, 30000);

hotspots.forEach((spot) => {
  spot.addEventListener("click", () => {
    storyText.textContent = spot.dataset.story;
    storyCard.classList.add("open");
  });
});

closeStory.addEventListener("click", () => storyCard.classList.remove("open"));

let audioContext = null;
let ambience = null;

function startSound() {
  audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const gain = audioContext.createGain();
  gain.gain.value = 0.025;
  gain.connect(audioContext.destination);

  const osc = audioContext.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 92;
  osc.connect(gain);
  osc.start();

  ambience = { osc, gain };
  soundBtn.textContent = "SOUND ON";
}

function stopSound() {
  if (!ambience) return;
  ambience.osc.stop();
  ambience = null;
  audioContext.close();
  audioContext = null;
  soundBtn.textContent = "SOUND OFF";
}

soundBtn.addEventListener("click", () => {
  if (!ambience) startSound();
  else stopSound();
});
