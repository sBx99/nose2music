let audioContext;

function initAudioContext() {
    if (!audioContext) {
        audioContext = new AudioContext();
    } else {
        audioContext.resume();
    }
}

document.getElementById("playAudioBtn").addEventListener("click", function() {
    initAudioContext();
})