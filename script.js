const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const playBtn = document.getElementById("playBtn");
const time = document.getElementById("time");

// Song load hone par duration set karo
audio.addEventListener("loadedmetadata", () => {
    progress.max = Math.floor(audio.duration);
    duration.textContent = format(audio.duration);
});

// Song chalne par progress aur current time update karo
audio.addEventListener("timeupdate", () => {
    progress.value = Math.floor(audio.currentTime);
    current.textContent = format(audio.currentTime);
});

// Progress bar se seek karna
progress.addEventListener("input", () => {
    audio.currentTime = progress.value;
});

// Time format
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

// Previous Song
function prevSong() {
    audio.currentTime = 0;
}

// Next Song
function nextSong() {
    audio.currentTime = audio.duration;
}

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
