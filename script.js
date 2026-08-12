const $=s=>document.querySelector(s);
const clock=$("#clock");
function tick(){const d=new Date();clock.textContent=d.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",hour12:true}).toUpperCase()}
tick();setInterval(tick,1000);

$("#enter").onclick=()=>document.querySelector("#city").scrollIntoView({behavior:"smooth"});
$("#help").onclick=()=>$("#modal").classList.add("show");
$("#closeHelp").onclick=()=>$("#modal").classList.remove("show");

const stories={
 chai:["CHAI / 11:47 PM","The last kettle","A little stall, two steel glasses, one tired bulb. Someone is always making one more cup."],
 train:["TRACKSIDE / SOMEWHERE","The late train","It doesn't matter where it is going. For a few seconds, the whole neighbourhood knows it passed."],
 night:["WINDOW / 12:13 AM","A light upstairs","One window is still glowing. Exam tomorrow? A night shift? Or simply someone who isn't ready to sleep."]
};
document.querySelectorAll(".hotspot").forEach(b=>b.onclick=()=>{
 const s=stories[b.dataset.story];$("#storyTag").textContent=s[0];$("#storyTitle").textContent=s[1];$("#storyText").textContent=s[2];$("#storyCard").classList.add("show")
});
$("#closeStory").onclick=()=>$("#storyCard").classList.remove("show");

const tracks=[
 ["A SONG FOR THE NIGHT","licensed / your playlist"],
 ["MIDNIGHT CHAI","licensed / your playlist"],
 ["CITY LIGHTS","licensed / your playlist"],
 ["LAST TRAIN HOME","licensed / your playlist"],
 ["SOMEWHERE, 1998","licensed / your playlist"]
];
let idx=0, playing=false;
function render(){const t=tracks[idx];$("#trackTitle").textContent=t[0];$("#trackArtist").textContent=t[1];$("#bar").style.width="0%";$("#time").textContent="00:00 / 00:00"}
$("#prev").onclick=()=>{idx=(idx+tracks.length-1)%tracks.length;render()};
$("#next").onclick=()=>{idx=(idx+1)%tracks.length;render()};
$("#play").onclick=()=>{
 playing=!playing;$("#play").textContent=playing?"❚❚":"▶";
 if(playing) $("#status")?.classList;
};
render();
