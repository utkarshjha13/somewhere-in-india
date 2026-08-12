const clock = document.getElementById("clock");
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const status = document.getElementById("status");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const progress = document.getElementById("progress");
const infoBtn = document.getElementById("infoBtn");
const dialog = document.getElementById("infoDialog");
const closeBtn = document.getElementById("closeBtn");

function updateClock(){
  const now = new Date();
  clock.textContent = now.toLocaleTimeString([], {hour:"2-digit", minute:"2-digit", hour12:true}).toLowerCase();
}
updateClock();
setInterval(updateClock, 1000);

function fmt(seconds){
  if (!Number.isFinite(seconds)) return "00:00";
  const m = Math.floor(seconds/60).toString().padStart(2,"0");
  const s = Math.floor(seconds%60).toString().padStart(2,"0");
  return `${m}:${s}`;
}

playBtn.addEventListener("click", async () => {
  if (!audio.src) {
    status.textContent = "ADD AUDIO";
    return;
  }
  if (audio.paused) {
    await audio.play();
  } else {
    audio.pause();
  }
});

audio.addEventListener("loadedmetadata", ()=>{
  duration.textContent = fmt(audio.duration);
});
audio.addEventListener("timeupdate", ()=>{
  current.textContent = fmt(audio.currentTime);
  progress.style.width = audio.duration ? `${(audio.currentTime/audio.duration)*100}%` : "0%";
});
audio.addEventListener("play", ()=>{
  playBtn.textContent = "❚❚";
  status.textContent = "PLAYING";
});
audio.addEventListener("pause", ()=>{
  playBtn.textContent = "▶";
  status.textContent = "READY";
});

if (infoBtn && dialog) infoBtn.addEventListener("click", ()=>dialog.showModal());
if (closeBtn && dialog) closeBtn.addEventListener("click", ()=>dialog.close());
if (dialog) dialog.addEventListener("click", e=>{ if(e.target === dialog) dialog.close(); });
