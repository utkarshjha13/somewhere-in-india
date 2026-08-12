const photos=[
 {src:"images/india-01.jpg",type:"INDIA / NIGHT",place:"City Lights",caption:"When the whole city decides to stay awake."},
 {src:"images/india-02.jpg",type:"INDIA / AFTER DARK",place:"A City Under Clouds",caption:"Somewhere between the clouds and the last light."},
 {src:"images/india-03.jpg",type:"INDIA / HERITAGE",place:"Agra",caption:"A monument, a reflection, a thousand little stories."},
 {src:"images/india-04.jpg",type:"INDIA / EVENING",place:"Kolkata",caption:"Old streets look different when the sky turns pink."},
 {src:"images/india-05.jpg",type:"INDIA / BACKWATERS",place:"Kerala",caption:"Slow water. Warm air. Nowhere to rush."},
 {src:"images/india-06.jpg",type:"INDIA / COUNTRYSIDE",place:"Somewhere Rural",caption:"The road gets quieter. The sky gets wider."}
];

const slides=document.getElementById("slides"),dots=document.getElementById("dots");
const placeType=document.getElementById("placeType"),place=document.getElementById("place"),caption=document.getElementById("caption");
const slideNo=document.getElementById("slideNo"),slideTotal=document.getElementById("slideTotal");
let index=0,timer=null,startX=0;

photos.forEach((p,i)=>{
 const s=document.createElement("div");s.className="slide"+(i===0?" active":"");
 const img=document.createElement("img");img.src=p.src;img.alt=p.place;img.loading=i<2?"eager":"lazy";s.appendChild(img);slides.appendChild(s);
 const d=document.createElement("button");d.setAttribute("aria-label",`Go to slide ${i+1}`);d.onclick=()=>go(i,true);dots.appendChild(d);
});
slideTotal.textContent=String(photos.length).padStart(2,"0");

function render(){
 [...slides.children].forEach((s,i)=>s.classList.toggle("active",i===index));
 [...dots.children].forEach((d,i)=>d.classList.toggle("active",i===index));
 const p=photos[index];
 placeType.textContent=p.type;place.textContent=p.place;caption.textContent=p.caption;
 slideNo.textContent=String(index+1).padStart(2,"0");
}
function go(n,manual=false){
 index=(n+photos.length)%photos.length;render();
 if(manual) restart();
}
function restart(){clearInterval(timer);timer=setInterval(()=>go(index+1),9000)}
document.getElementById("prev").onclick=()=>go(index-1,true);
document.getElementById("next").onclick=()=>go(index+1,true);
restart();

document.addEventListener("keydown",e=>{if(e.key==="ArrowRight")go(index+1,true);if(e.key==="ArrowLeft")go(index-1,true);if(e.key===" ")togglePlay()});
document.addEventListener("touchstart",e=>startX=e.touches[0].clientX,{passive:true});
document.addEventListener("touchend",e=>{const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>45)go(index+(dx<0?1:-1),true)},{passive:true});

function clock(){
 const d=new Date();let h=d.getHours(),m=String(d.getMinutes()).padStart(2,"0"),ap=h>=12?"PM":"AM";h=h%12||12;
 document.getElementById("clock").textContent=`${String(h).padStart(2,"0")}:${m} ${ap}`;
}
clock();setInterval(clock,30000);

const audio=document.getElementById("audio"), play=document.getElementById("play"), nameEl=document.getElementById("trackName");
const state=document.getElementById("trackState"), progress=document.getElementById("progress"), current=document.getElementById("current"),duration=document.getElementById("duration");
const tracks=[
 {name:"Last Local",file:"audio/track-01.mp3"},
 {name:"Chai After Dark",file:"audio/track-02.mp3"},
 {name:"Rain on the Highway",file:"audio/track-03.mp3"},
 {name:"Old City Lights",file:"audio/track-04.mp3"},
 {name:"Late Night FM",file:"audio/track-05.mp3"}
];
let ti=0;
function fmt(s){if(!Number.isFinite(s))return"00:00";return `${String(Math.floor(s/60)).padStart(2,"0")}:${String(Math.floor(s%60)).padStart(2,"0")}`}
function loadTrack(i,autoplay=false){
 ti=(i+tracks.length)%tracks.length;const t=tracks[ti];audio.src=t.file;nameEl.textContent=t.name;document.getElementById("trackNo").textContent=String(ti+1).padStart(2,"0");state.textContent="READY";progress.style.width="0%";current.textContent="00:00";duration.textContent="00:00";
 if(autoplay)audio.play().catch(()=>{});
}
function togglePlay(){
 if(!audio.src)loadTrack(ti);
 if(audio.paused){audio.play().then(()=>{play.textContent="Ⅱ";state.textContent="PLAYING"}).catch(()=>{state.textContent="TAP AGAIN"})}
 else{audio.pause();play.textContent="▶";state.textContent="PAUSED"}
}
play.onclick=togglePlay;
document.getElementById("prev").addEventListener("dblclick",()=>loadTrack(ti-1,true));
document.getElementById("next").addEventListener("dblclick",()=>loadTrack(ti+1,true));
audio.addEventListener("timeupdate",()=>{current.textContent=fmt(audio.currentTime);if(audio.duration){duration.textContent=fmt(audio.duration);progress.style.width=(audio.currentTime/audio.duration*100)+"%"}})
audio.addEventListener("ended",()=>loadTrack(ti+1,true));
loadTrack(0,false);

const modal=document.getElementById("modal");
document.getElementById("infoBtn").onclick=()=>modal.hidden=false;
document.getElementById("closeInfo").addEventListener("click",()=>{modal.hidden=true;modal.style.display="none"});
modal.addEventListener("click",e=>{if(e.target===modal)modal.hidden=true});
