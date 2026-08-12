const scenes = [
  {
    name:"DELHI · AFTER RAIN",
    caption:"The city is still awake.",
    img:"https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2200&q=88"
  },
  {
    name:"CITY LIGHTS · 11:47 PM",
    caption:"Somewhere between the last train and the last chai.",
    img:"https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=2200&q=88"
  },
  {
    name:"RAINED-IN ROADS",
    caption:"Wet roads. Warm windows. One more song.",
    img:"https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=2200&q=88"
  },
  {
    name:"MIDNIGHT TRAFFIC",
    caption:"Nobody is really in a hurry anymore.",
    img:"https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=2200&q=88"
  },
  {
    name:"NEON INDIA",
    caption:"A little light makes a long road feel shorter.",
    img:"https://images.unsplash.com/photo-1494522358652-f30e61a60313?auto=format&fit=crop&w=2200&q=88"
  },
  {
    name:"LAST METRO",
    caption:"The night moves. So do we.",
    img:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=2200&q=88"
  }
];

const audioTracks = [
  {title:"Late Night FM", src:"audio/track-01.mp3"},
  {title:"Midnight Chai", src:"audio/track-02.mp3"},
  {title:"City Lights", src:"audio/track-03.mp3"},
  {title:"Last Local", src:"audio/track-04.mp3"},
  {title:"2 AM Roads", src:"audio/track-05.mp3"}
];

const a=document.querySelector(".photo-a"), b=document.querySelector(".photo-b");
const caption=document.getElementById("caption");
const sceneName=document.getElementById("sceneName");
const sceneCount=document.getElementById("sceneCount");
const audio=document.getElementById("audio");
const play=document.getElementById("play");
const progress=document.getElementById("progress");
const elapsed=document.getElementById("elapsed");
const duration=document.getElementById("duration");
const trackTitle=document.getElementById("trackTitle");
const trackNumber=document.getElementById("trackNumber");
const trackState=document.getElementById("trackState");
const soundState=document.getElementById("soundState");

let sceneIndex=0, showingA=true, trackIndex=0, timer;

function renderScene(i){
  const s=scenes[i];
  const incoming=showingA?b:a, outgoing=showingA?a:b;
  incoming.style.backgroundImage=`url("${s.img}")`;
  incoming.style.opacity="1";
  outgoing.style.opacity="0";
  incoming.classList.add("zoom");
  setTimeout(()=>outgoing.classList.remove("zoom"),300);
  showingA=!showingA;
  caption.textContent=s.caption;
  sceneName.textContent=s.name;
  sceneCount.textContent=`${String(i+1).padStart(2,"0")} / ${String(scenes.length).padStart(2,"0")}`;
}

function nextScene(){
  sceneIndex=(sceneIndex+1)%scenes.length;
  renderScene(sceneIndex);
}
timer=setInterval(nextScene,9000);

function fmt(sec){
  if(!isFinite(sec)) return "00:00";
  const m=Math.floor(sec/60), s=Math.floor(sec%60);
  return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
}
function loadTrack(i,autoplay=false){
  trackIndex=(i+audioTracks.length)%audioTracks.length;
  const t=audioTracks[trackIndex];
  trackTitle.textContent=t.title;
  trackNumber.textContent=`${String(trackIndex+1).padStart(2,"0")} / 05`;
  audio.src=t.src;
  audio.load();
  trackState.textContent="READY";
  soundState.textContent="ADD YOUR LICENSED TRACKS";
  progress.style.width="0%";
  elapsed.textContent="00:00";
  duration.textContent="00:00";
  if(autoplay) audio.play().catch(()=>{});
}
play.addEventListener("click",()=>{
  if(!audio.src) loadTrack(trackIndex);
  if(audio.paused){
    audio.play().then(()=>{
      play.textContent="Ⅱ";
      trackState.textContent="PLAYING";
      soundState.textContent="SOUND ON";
    }).catch(()=>{
      trackState.textContent="ADD AUDIO FILES";
    });
  }else{
    audio.pause();
    play.textContent="▶";
    trackState.textContent="PAUSED";
  }
});
document.getElementById("next").addEventListener("click",()=>loadTrack(trackIndex+1,true));
document.getElementById("prev").addEventListener("click",()=>loadTrack(trackIndex-1,true));
audio.addEventListener("loadedmetadata",()=>duration.textContent=fmt(audio.duration));
audio.addEventListener("timeupdate",()=>{
  elapsed.textContent=fmt(audio.currentTime);
  progress.style.width=(audio.duration?(audio.currentTime/audio.duration)*100:0)+"%";
});
audio.addEventListener("ended",()=>loadTrack(trackIndex+1,true));

function updateClock(){
  const d=new Date();
  const time=d.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",hour12:true});
  document.getElementById("clock").textContent=time;
  document.getElementById("footerTime").textContent=`${time} · SOMEWHERE IN INDIA`;
}
updateClock(); setInterval(updateClock,1000);

loadTrack(0,false);
