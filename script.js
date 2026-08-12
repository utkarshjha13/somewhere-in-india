const clock = document.getElementById("clock");
function tick(){
  const now = new Date();
  clock.textContent = now.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",hour12:true}).toUpperCase();
}
tick(); setInterval(tick,1000);

const dialog = document.getElementById("infoDialog");
document.getElementById("infoBtn").addEventListener("click",()=>dialog.showModal());
document.getElementById("closeBtn").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{ if(e.target===dialog) dialog.close(); });

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const audioHint = document.getElementById("audioHint");

const possibleTracks = [
  "audio/track-01.mp3",
  "audio/last-local.mp3",
  "audio/song.mp3"
];

let trackLoaded = false;
async function findTrack(){
  for(const src of possibleTracks){
    try{
      const res = await fetch(src,{method:"HEAD"});
      if(res.ok){ audio.src=src; trackLoaded=true; audioHint.textContent="LOCAL TRACK"; break; }
    }catch{}
  }
}
findTrack();

function fmt(sec){
  if(!Number.isFinite(sec)) return "00:00";
  const m=Math.floor(sec/60), s=Math.floor(sec%60).toString().padStart(2,"0");
  return `${m}:${s}`;
}
audio.addEventListener("loadedmetadata",()=>duration.textContent=fmt(audio.duration));
audio.addEventListener("timeupdate",()=>{
  current.textContent=fmt(audio.currentTime);
  progress.style.width=audio.duration ? `${audio.currentTime/audio.duration*100}%` : "0%";
});
audio.addEventListener("ended",()=>playBtn.textContent="▶");

playBtn.addEventListener("click",async()=>{
  if(!trackLoaded){
    audioHint.textContent="ADD MP3 TO /audio";
    return;
  }
  if(audio.paused){await audio.play();playBtn.textContent="Ⅱ";}
  else{audio.pause();playBtn.textContent="▶";}
});

document.getElementById("soundBtn").addEventListener("click",()=>{
  audio.muted=!audio.muted;
  document.getElementById("soundBtn").textContent=audio.muted?"×":"♪";
});
