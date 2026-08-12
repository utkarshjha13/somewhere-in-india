const clock = document.getElementById("clock");
function updateClock(){
  const d=new Date();
  clock.textContent=d.toLocaleTimeString([],{
    hour:"2-digit",minute:"2-digit",hour12:true
  }).toUpperCase();
}
updateClock(); setInterval(updateClock,1000);

const play=document.getElementById("play");
const progress=document.getElementById("progress");
let playing=false;
play.addEventListener("click",()=>{
  playing=!playing;
  play.textContent=playing?"Ⅱ":"▶";
});
progress.addEventListener("input",()=>{});
