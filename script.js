const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const playBtn = document.getElementById("playBtn");
const time = document.getElementById("time");

const songs = [
  {
    title: "छठ पूजा: काँच ही बाँस के बहंगिया",
    artist: "Anuradha Paudwal",
    file: "bahangiya.mp3"
  },
    {
    title: "उग हो सुरुज देव",
    artist: "Sharda Sinha",
    file: "surajdev.mp3"
    },
  
    {
    title: "Patna ke ghtwa pe",
    artist: "Chhaila bihari",
    file: "patnakeghtwa.mp3"
    },
];

let currentSong = 0;

// Load Song
function loadSong(index) {
  audio.src = songs[index].file;

  document.querySelector(".left h3").textContent = songs[index].title;
  document.querySelector(".left p").textContent = songs[index].artist;

  audio.load();
}

loadSong(currentSong);

// Metadata
audio.addEventListener("loadedmetadata", () => {
  if (!isNaN(audio.duration)) {
    progress.max = Math.floor(audio.duration);
    duration.textContent = format(audio.duration);
  }
});

// Progress
audio.addEventListener("timeupdate", () => {
  progress.value = Math.floor(audio.currentTime);
  current.textContent = format(audio.currentTime);
});

// Seek
progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
});

// Format
function format(sec) {
  if (isNaN(sec)) return "0:00";

  let min = Math.floor(sec / 60);
  let s = Math.floor(sec % 60);

  return min + ":" + (s < 10 ? "0" + s : s);
}

// Play Pause
function playPause() {
  if (audio.paused) {
    audio.play();
    playBtn.innerHTML = "⏸";
  } else {
    audio.pause();
    playBtn.innerHTML = "▶";
  }
}

// Next Song
function nextSong() {
  currentSong++;

  if (currentSong >= songs.length) {
    currentSong = 0;
  }

  loadSong(currentSong);

  function nextSong() {
    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    audio.play();
    playBtn.innerHTML = "⏸";
  }
}

// Previous Song
function prevSong() {
  currentSong--;

  if (currentSong < 0) {
    currentSong = songs.length - 1;
  }

  loadSong(currentSong);

  audio.onloadedmetadata = function () {
    progress.max = Math.floor(audio.duration);
    duration.textContent = format(audio.duration);

    audio.play();
    playBtn.innerHTML = "⏸";
  };
}

// Song End
audio.addEventListener("ended", nextSong);

// Clock
function updateClock() {
  time.textContent = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
}

updateClock();
setInterval(updateClock, 1000);
