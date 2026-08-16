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
