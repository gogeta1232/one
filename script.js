// Video Mute/Unmute Button Functionality
const video = document.getElementById('background-video');
const muteBtn = document.getElementById('mute-btn');

muteBtn.addEventListener('click', () => {
    if (video.muted) {
        video.muted = false;
        muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
        video.muted = true;
        muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
});

// Profile View Count Functionality
window.addEventListener('DOMContentLoaded', (event) => {
    let viewCount = parseInt(document.getElementById("view-count").textContent);
    viewCount += 1;  // Increment by 1 for each visit (adjust as needed)
    document.getElementById("view-count").textContent = viewCount;
});
