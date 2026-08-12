const tracks = [
  {title:"Late Night FM", src:""},
  {title:"Raat Ki Sadak", src:""},
  {title:"Chai, Baarish & Sheher", src:""},
  {title:"11:47 PM", src:""},
  {title:"Somewhere Radio", src:""}
];

let index=0, audio=null, playing=false;
const $=id=>document.getElementById(id);
const title=$("title"), state=$("state"), count=$("count"), play=$("play"), bar=$("bar"), sound=$("sound");

function render(){
  title.textContent=tracks[index].title;
  count.textContent=String(index+1).padStart(2,"0")+" / 05";
  $("current").textContent="00:00";
  $("duration").textContent="00:00";
  bar.style.width="0%";
  state.textContent=tracks[index].src ? "READY" : "PREVIEW";
  sound.textContent=tracks[index].src ? "SOUND ON" : "SOUND OFF";
  play.textContent=tracks[index].src && playing ? "Ⅱ" : "▶";
}
function next(){index=(index+1)%tracks.length; stop(); render();}
function prev(){index=(index-1+tracks.length)%tracks.length; stop(); render();}
function stop(){if(audio){audio.pause();audio=null} playing=false}
function start(){
  const src=tracks[index].src;
  if(!src){ toast("Music slots ready — licensed audio files can be added later."); return; }
  audio=new Audio(src); audio.volume=.75; audio.play().then(()=>{playing=true;render()}).catch(()=>toast("Tap the play button again to start audio."));
  audio.addEventListener("timeupdate",()=>{
    if(!audio.duration)return;
    bar.style.width=(audio.currentTime/audio.duration*100)+"%";
    $("current").textContent=time(audio.currentTime);
    $("duration").textContent=time(audio.duration);
  });
  audio.addEventListener("ended",next);
}
function time(n){return Math.floor(n/60).toString().padStart(2,"0")+":"+Math.floor(n%60).toString().padStart(2,"0")}
play.onclick=()=>{if(playing)stop();else start();render()}
$("next").onclick=next;$("prev").onclick=prev;
$("chai").onclick=()=>toast("Chai is on the way ☕");
$("help").onclick=()=>toast("Turn sound on, dim the lights, and enter the night.");
function clock(){
 const d=new Date(), s=d.toLocaleTimeString([], {hour:"2-digit",minute:"2-digit",hour12:true});
 $("clock").textContent=s;$("footerClock").textContent=s+" · SOMEWHERE IN INDIA";
}
function toast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2600)}
clock();setInterval(clock,1000);render();
