const enter=document.getElementById("enter"),landing=document.getElementById("landing"),night=document.getElementById("night");
enter.addEventListener("click",()=>{landing.classList.add("leave");setTimeout(()=>night.classList.add("show"),120);});

const story=document.getElementById("story"), storyTitle=document.getElementById("storyTitle"), storyCopy=document.getElementById("storyCopy");
document.querySelectorAll(".point").forEach(p=>p.addEventListener("click",()=>{storyTitle.textContent=p.dataset.title;storyCopy.textContent=p.dataset.copy;story.classList.add("open");}));
document.getElementById("storyClose").onclick=()=>story.classList.remove("open");

const tracks=["LATE NIGHT FM","A RAINY ROAD","TWO STATIONS AWAY","THE LAST CHAI","HOME, SOMEWHERE"];
let index=0, playing=false;
const name=document.getElementById("trackName"), no=document.getElementById("trackNo"), status=document.getElementById("status"), play=document.getElementById("play");
function render(){name.textContent=tracks[index];no.textContent=`${String(index+1).padStart(2,"0")} / ${String(tracks.length).padStart(2,"0")}`;}
function setPlay(v){playing=v;play.textContent=playing?"Ⅱ":"▶";status.textContent=playing?"PLAYING":"READY";document.querySelector(".equalizer").style.opacity=playing?"1":".45";}
play.onclick=()=>setPlay(!playing);
document.getElementById("next").onclick=()=>{index=(index+1)%tracks.length;render();setPlay(true)};
document.getElementById("prev").onclick=()=>{index=(index-1+tracks.length)%tracks.length;render()};
document.getElementById("radioClose").onclick=()=>document.querySelector(".radio").style.display="none";
render();

let ctx,gain,osc;
document.getElementById("sound").onclick=()=>{
 if(ctx){osc.stop();ctx.close();ctx=null;document.getElementById("sound").textContent="AMBIENCE OFF";return}
 ctx=new (window.AudioContext||window.webkitAudioContext)();gain=ctx.createGain();gain.gain.value=.018;gain.connect(ctx.destination);osc=ctx.createOscillator();osc.type="sine";osc.frequency.value=86;osc.connect(gain);osc.start();document.getElementById("sound").textContent="AMBIENCE ON";
};
