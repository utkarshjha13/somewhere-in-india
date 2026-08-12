const slides = [
  {img:"./india-01.jpg", ey:"A LITTLE NIGHT STORY", tag:"Lights rise, somewhere beyond the rooftops.", chai:"चाय", place:"INDIA / NIGHT", genre:"CITY LIGHTS", track:"City Lights"},
  {img:"./india-02.jpg", ey:"AFTER DARK", tag:"The city keeps a thousand little stories awake.", chai:"शहर", place:"INDIA / NIGHT", genre:"MIDNIGHT INDIA", track:"Midnight City"},
  {img:"./india-03.jpg", ey:"A PLACE TO PAUSE", tag:"Some views don't need a reason.", chai:"सफ़र", place:"AGRA / DAY", genre:"SLOW EVENING", track:"A Quiet Evening"},
  {img:"./india-04.jpg", ey:"SOUTHERN AIR", tag:"Water moves slowly. Time does too.", chai:"चाय", place:"KERALA / MORNING", genre:"BACKWATER FM", track:"Nadi Ke Paar"},
  {img:"./india-05.jpg", ey:"THE QUIET SIDE", tag:"Morning arrives softly over the fields.", chai:"सुबह", place:"INDIA / MORNING", genre:"FIRST LIGHT", track:"Subah Somewhere"},
  {img:"./india-06.jpg", ey:"ONE MORE CUP", tag:"Stay a little longer. The journey isn't over.", chai:"आख़िरी चाय", place:"INDIA / EVENING", genre:"LATE NIGHT", track:"Last Local"}
];

let idx = 0;
const $ = id => document.getElementById(id);
const photo = $("photo"), eyebrow=$("eyebrow"), tagline=$("tagline"), chai=$("chaiTitle"),
      place=$("placeLabel"), genre=$("genre"), track=$("trackName"), count=$("count"),
      total=$("total"), trackNo=$("trackNo"), dots=$("dots"), audio=$("audio"),
      play=$("play"), progress=$("progress"), current=$("current"), duration=$("duration"),
      state=$("state"), sound=$("sound");

total.textContent = String(slides.length).padStart(2,"0");

function render(){
  const s = slides[idx];
  photo.classList.add("changing");
  setTimeout(() => {
    photo.src = s.img;
    photo.onload = () => photo.classList.remove("changing");
    photo.onerror = () => {
      photo.src = "./india-01.jpg";
      photo.classList.remove("changing");
    };
  }, 180);

  eyebrow.textContent=s.ey;
  tagline.textContent=s.tag;
  chai.textContent=s.chai;
  place.textContent=s.place;
  genre.textContent=s.genre;
  track.textContent=s.track;
  count.textContent=String(idx+1).padStart(2,"0");
  trackNo.textContent=`${String(idx+1).padStart(2,"0")} / ${String(slides.length).padStart(2,"0")}`;

  dots.querySelectorAll("button").forEach((b,i)=>b.classList.toggle("active",i===idx));

  const audioPath=`./audio/track-${String(idx+1).padStart(2,"0")}.mp3`;
  audio.src=audioPath;
  audio.load();
  state.textContent="READY";
  progress.style.width="0%";
  current.textContent="00:00";
  duration.textContent="00:00";
}

slides.forEach((_,i)=>{
  const b=document.createElement("button");
  b.setAttribute("aria-label",`Photo ${i+1}`);
  b.onclick=()=>{idx=i;render()};
  dots.appendChild(b);
});

function next(){idx=(idx+1)%slides.length;render()}
function prev(){idx=(idx-1+slides.length)%slides.length;render()}

$("next").onclick=next;
$("prev").onclick=prev;

play.onclick=async()=>{
  if(!audio.src){state.textContent="ADD AUDIO";return}
  if(audio.paused){
    try{await audio.play();play.textContent="Ⅱ";state.textContent="PLAYING";sound.textContent="♪"}
    catch(e){state.textContent="ADD AUDIO"}
  }else{
    audio.pause();play.textContent="▶";state.textContent="PAUSED"
  }
};

audio.addEventListener("loadedmetadata",()=>{
  duration.textContent=fmt(audio.duration);
});
audio.addEventListener("timeupdate",()=>{
  if(audio.duration){
    progress.style.width=(audio.currentTime/audio.duration*100)+"%";
    current.textContent=fmt(audio.currentTime);
  }
});
audio.addEventListener("ended",next);
audio.addEventListener("error",()=>{state.textContent="VISUAL STORY";});

function fmt(s){
  if(!isFinite(s)) return "00:00";
  return String(Math.floor(s/60)).padStart(2,"0")+":"+String(Math.floor(s%60)).padStart(2,"0");
}

sound.onclick=()=>{
  audio.muted=!audio.muted;
  sound.textContent=audio.muted?"×":"♪";
};

function clock(){
  $("clock").textContent=new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",hour12:true}).toLowerCase();
}
clock();
setInterval(clock,1000);

let sx=0;
$("story").addEventListener("touchstart",e=>sx=e.touches[0].clientX,{passive:true});
$("story").addEventListener("touchend",e=>{
  const dx=e.changedTouches[0].clientX-sx;
  if(Math.abs(dx)>55) dx<0?next():prev();
},{passive:true});

window.addEventListener("keydown",e=>{
  if(e.key==="ArrowRight") next();
  if(e.key==="ArrowLeft") prev();
  if(e.key===" ") {e.preventDefault();play.click();}
});

render();
