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
    file: "surujdev.mp3"
  }
];

let currentSong = 0;

function loadSong(index) {
    audio.src = songs[index].file;
    document.querySelector(".left h3").textContent = songs[index].title;
    document.querySelector(".left p").textContent = songs[index].artist;
    audio.load();
}

loadSong(currentSong);

audio.addEventListener("loadedmetadata", () => {
    progress.max = Math.floor(audio.duration);
    duration.textContent = format(audio.duration);
});

audio.addEventListener("timeupdate", () => {
    progress.value = Math.floor(audio.currentTime);
    current.textContent = format(audio.currentTime);
});

progress.addEventListener("input", () => {
    audio.currentTime = progress.value;
});

function format(sec) {
    if (isNaN(sec)) return "0:00";
    let min = Math.floor(sec / 60);
    let s = Math.floor(sec % 60);
    if (s < 10) s = "0" + s;
    return min + ":" + s;
}
// Play / Pause
function playPause() {
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = "⏸";
    } else {
        audio.pause();
        playBtn.innerHTML = "▶";
    }
}

function nextSong() {
    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);

    audio.onloadedmetadata = () => {
        audio.play();
        playBtn.innerHTML = "⏸";
    };
}

    loadSong(currentSong);
    audio.play();
    playBtn.innerHTML = "⏸";
}
function prevSong() {
    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);

    audio.onloadedmetadata = () => {
        audio.play();
        playBtn.innerHTML = "⏸";
    };
}


    loadSong(currentSong);
    audio.play();
    playBtn.innerHTML = "⏸";
}

// Song khatam hone par next song chalega
audio.addEventListener("ended", () => {
    nextSong();
});

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
