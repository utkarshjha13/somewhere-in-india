const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const playDisc = document.getElementById("playDisc");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const clock = document.getElementById("clock");
const infoBtn = document.getElementById("infoBtn");
const dialog = document.getElementById("infoDialog");
const closeBtn = document.getElementById("closeBtn");

function formatTime(sec){
  if(!Number.isFinite(sec)) return "00:00";
  const m = Math.floor(sec/60).toString().padStart(2,"0");
  const s = Math.floor(sec%60).toString().padStart(2,"0");
  return `${m}:${s}`;
}
function setPlayingUI(){
  const playing = !audio.paused;
  playBtn.textContent = playing ? "Ⅱ" : "▶";
  playDisc.textContent = playing ? "Ⅱ" : "♪";
}
function togglePlay(){
  if(audio.paused) audio.play().catch(()=>{});
  else audio.pause();
}
playBtn.addEventListener("click", togglePlay);
playDisc.addEventListener("click", togglePlay);
audio.addEventListener("play", setPlayingUI);
audio.addEventListener("pause", setPlayingUI);
audio.addEventListener("loadedmetadata", ()=>{
  duration.textContent = formatTime(audio.duration);
});
audio.addEventListener("timeupdate", ()=>{
  current.textContent = formatTime(audio.currentTime);
  progress.value = audio.duration ? (audio.currentTime/audio.duration)*100 : 0;
});
progress.addEventListener("input", ()=>{
  if(audio.duration) audio.currentTime = (progress.value/100)*audio.duration;
});

function updateClock(){
  const now = new Date();
  clock.textContent = now.toLocaleTimeString("en-IN",{
    hour:"2-digit",minute:"2-digit",hour12:true
  }).toUpperCase();
}
updateClock();
setInterval(updateClock,1000);

infoBtn.addEventListener("click",()=>dialog.showModal());
closeBtn.addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",(e)=>{
  if(e.target === dialog) dialog.close();
});
