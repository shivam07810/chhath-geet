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

function format(sec) {
    if (isNaN(sec)) return "0:00";
    let min = Math.floor(sec / 60);
    let s = Math.floor(sec % 60);
    if (s < 10) s = "0" + s;
    return min + ":" + s;
}
time.innerHTML = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
});
updateClock();
setInterval(updateClock, 1000);
function updateClock() {
    time.innerHTML = new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
}

updateClock();
setInterval(updateClock, 1000);
