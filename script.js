const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const time = document.getElementById("time");

let playing = false;

// Live Clock
function updateClock() {
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();

  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12;
  if (h === 0) h = 12;

  h = String(h).padStart(2, "0");
  m = String(m).padStart(2, "0");

  time.innerHTML = h + ":" + m + " " + ampm;
}

setInterval(updateClock, 1000);
updateClock();

// Play / Pause
function playPause() {
  if (playing) {
    audio.pause();
    playBtn.innerHTML = "▶";
  } else {
    audio.play();
    playBtn.innerHTML = "⏸";
  }
  playing = !playing;
}

//
audio.addEventListener("loadedmetadata", () => {
  progress.max = Math.floor(audio.duration);
  duration.textContent = format(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  progress.value = Math.floor(audio.currentTime);
  current.textContent = format(audio.currentTime);
});

progress.addEventListener("input", function () {
  audio.currentTime = this.value;
});
