const slides=[
 {img:"images/india-01.jpg",ey:"A LITTLE NIGHT STORY",tag:"Lights rise, somewhere beyond the rooftops.",chai:"चाय",genre:"CITY LIGHTS",track:"Raat Ka Safar"},
 {img:"images/india-02.jpg",ey:"AFTER DARK",tag:"The city keeps a thousand little stories awake.",chai:"शहर",genre:"MIDNIGHT INDIA",track:"Last Local"},
 {img:"images/india-03.jpg",ey:"A PLACE TO PAUSE",tag:"Some views don't need a reason.",chai:"सफ़र",genre:"SLOW EVENING",track:"A Quiet Evening"},
 {img:"images/india-04.jpg",ey:"SOUTHERN AIR",tag:"Water moves slowly. Time does too.",chai:"चाय",genre:"BACKWATER FM",track:"Nadi Ke Paar"},
 {img:"images/india-05.jpg",ey:"THE QUIET SIDE",tag:"Morning arrives softly over the fields.",chai:"सुबह",genre:"FIRST LIGHT",track:"Subah Somewhere"},
 {img:"images/india-06.jpg",ey:"ONE MORE CUP",tag:"Stay a little longer. The night isn't over.",chai:"आख़िरी चाय",genre:"LATE NIGHT",track:"Last Local"}
];
let idx=0, playing=false;
const $=id=>document.getElementById(id);
const photo=$("photo"), eyebrow=$("eyebrow"), tagline=$("tagline"), chai=$("chaiTitle"), genre=$("genre"), track=$("trackName"), count=$("count"), trackNo=$("trackNo"), dots=$("dots"), audio=$("audio"), play=$("play"), progress=$("progress"), current=$("current"), duration=$("duration"), state=$("state");

function render(){
 const s=slides[idx];
 photo.style.opacity=.18;
 setTimeout(()=>{photo.style.backgroundImage=`url("${s.img}")`; photo.style.opacity=1},180);
 eyebrow.textContent=s.ey; tagline.textContent=s.tag; chai.textContent=s.chai; genre.textContent=s.genre; track.textContent=s.track;
 count.textContent=String(idx+1).padStart(2,"0"); trackNo.textContent=`${String(idx+1).padStart(2,"0")} / 06`;
 dots.querySelectorAll("button").forEach((b,i)=>b.classList.toggle("active",i===idx));
 audio.src=`audio/track-${String(idx+1).padStart(2,"0")}.mp3`;
 audio.load(); state.textContent="READY"; progress.style.width="0%"; current.textContent="00:00"; duration.textContent="00:00";
}
slides.forEach((_,i)=>{let b=document.createElement("button");b.setAttribute("aria-label",`Photo ${i+1}`);b.onclick=()=>{idx=i;render()};dots.appendChild(b)});
function next(){idx=(idx+1)%slides.length;render()}
function prev(){idx=(idx-1+slides.length)%slides.length;render()}
$("next").onclick=next;$("prev").onclick=prev;
play.onclick=async()=>{if(!audio.src)return;if(audio.paused){try{await audio.play();playing=true;play.textContent="Ⅱ";state.textContent="PLAYING"}catch(e){state.textContent="ADD AUDIO"}}else{audio.pause();playing=false;play.textContent="▶";state.textContent="PAUSED"}};
audio.addEventListener("timeupdate",()=>{if(audio.duration){progress.style.width=(audio.currentTime/audio.duration*100)+"%";current.textContent=fmt(audio.currentTime);duration.textContent=fmt(audio.duration)}});
audio.addEventListener("ended",next);
function fmt(s){if(!isFinite(s))return"00:00";return String(Math.floor(s/60)).padStart(2,"0")+":"+String(Math.floor(s%60)).padStart(2,"0")}
$("sound").onclick=()=>{audio.muted=!audio.muted;$("sound").textContent=audio.muted?"×":"♪"};
setInterval(()=>{let d=new Date();$("clock").textContent=d.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",hour12:true}).toLowerCase()},1000);
let sx=0; story.addEventListener("touchstart",e=>sx=e.touches[0].clientX,{passive:true}); story.addEventListener("touchend",e=>{let dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>55){dx<0?next():prev()}},{passive:true});
window.addEventListener("keydown",e=>{if(e.key==="ArrowRight")next();if(e.key==="ArrowLeft")prev();if(e.key===" "){e.preventDefault();play.click()}});
render();
