const intro=document.getElementById("intro");
document.getElementById("enter").onclick=()=>intro.classList.add("out");

const story=document.getElementById("story"), st=document.getElementById("storyTitle"), sx=document.getElementById("storyText");
document.querySelectorAll(".hotspot").forEach(b=>b.onclick=()=>{st.textContent=b.dataset.title;sx.textContent=b.dataset.text;story.classList.add("open")});
document.querySelectorAll(".scene-detail").forEach(o=>o.onclick=()=>{st.textContent=o.dataset.title;sx.textContent=o.dataset.text;story.classList.add("open")});
document.getElementById("close").onclick=()=>story.classList.remove("open");

const tracks=["Late Night FM","A Rainy Road","Two Stations Away","The Last Chai","Home, Somewhere"];
let n=0,playing=false;
function render(){document.getElementById("track").textContent=tracks[n];document.getElementById("count").textContent=`${String(n+1).padStart(2,"0")} / 05`;}
function toggle(){playing=!playing;document.getElementById("play").textContent=playing?"Ⅱ":"▶";document.getElementById("status").textContent=playing?"PLAYING":"READY";}
document.getElementById("play").onclick=toggle;
document.getElementById("next").onclick=()=>{n=(n+1)%tracks.length;render();if(!playing)toggle()};
document.getElementById("prev").onclick=()=>{n=(n+4)%tracks.length;render()};
render();

document.getElementById("info").onclick=()=>document.getElementById("infoPanel").classList.add("open");
document.getElementById("infoClose").onclick=()=>document.getElementById("infoPanel").classList.remove("open");

let audioCtx=null,osc=null;
document.getElementById("ambience").onclick=()=>{
 const btn=document.getElementById("ambience");
 if(audioCtx){osc.stop();audioCtx.close();audioCtx=null;btn.textContent="SOUND OFF";return}
 audioCtx=new (window.AudioContext||window.webkitAudioContext)();
 const gain=audioCtx.createGain();gain.gain.value=.012;gain.connect(audioCtx.destination);
 osc=audioCtx.createOscillator();osc.type="sine";osc.frequency.value=72;osc.connect(gain);osc.start();
 btn.textContent="SOUND ON";
};
