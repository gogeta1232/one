// **Mute/Unmute Button Functionality**
const video = document.getElementById('background-video');
const muteBtn = document.getElementById('mute-btn');

// Toggle mute state and button icon
muteBtn.addEventListener('click', () => {
    const isMuted = video.muted;
    video.muted = !isMuted;
    muteBtn.innerHTML = isMuted ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
});

// **Clock Update Function**
function updateClock() {
    const clockElement = document.getElementById("corner-clock");
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format

    // Update the clock element with formatted time
    clockElement.innerHTML = `
        <span id="corner-hours">${hours}</span>:<span id="corner-minutes">${minutes}</span>:<span id="corner-seconds">${seconds}</span> 
        <span id="corner-ampm">${ampm}</span>
    `;
}

// Initialize clock immediately and update it every second
updateClock();
setInterval(updateClock, 1000);

// **Scroll to Top Button Functionality**
const scrollToTop = document.getElementById('scroll-to-top');

// Show/hide scroll-to-top button based on scroll position
window.addEventListener('scroll', () => {
    scrollToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// Smooth scroll to the top when button is clicked
scrollToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Get view count from localStorage or initialize to 0 if not present
let viewCount = parseInt(localStorage.getItem('viewCount') || '0');

// Check if the user has already visited the page
const hasVisited = localStorage.getItem('hasVisited');

// If the user hasn't visited before, increment the view count and set the 'hasVisited' flag
if (!hasVisited) {
    viewCount++; // Increment the view count
    localStorage.setItem('viewCount', viewCount); // Save the updated view count to localStorage
    localStorage.setItem('hasVisited', 'true'); // Set a flag indicating the user has visited
}

// Display the current view count
document.getElementById("view-count").textContent = viewCount;
// Replace with your Discord User ID
const userId = "1214142384544161793";

// Lanyard API URL
const apiUrl = `https://api.lanyard.rest/v1/users/${userId}`;

// Function to update the Discord profile dynamically
async function updateDiscordStatus() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.success) {
            const discordData = data.data;

            // Update Avatar
            const avatarUrl = discordData.discord_user.avatar
                ? `https://cdn.discordapp.com/avatars/${discordData.discord_user.id}/${discordData.discord_user.avatar}.png`
                : "default-avatar.png";
            document.getElementById("discord-avatar").src = avatarUrl;

            // Update Username
            document.getElementById("discord-username").textContent =
                discordData.discord_user.username;

            // Update Status
            const statusBadge = document.getElementById("discord-status-badge");
            statusBadge.textContent = discordData.discord_status;
            statusBadge.className = `status-badge ${discordData.discord_status}`;

            // Update Activities or Custom Status
            document.getElementById("discord-status").textContent =
                discordData.activities.length > 0
                    ? discordData.activities[0].state || "No activity"
                    : "No custom status";
                    // Add Discord badges dynamically with icons
if (discordData.discord_user.public_flags) {
    const badgesContainer = document.getElementById("discord-badges");
    badgesContainer.innerHTML = ""; // Clear existing badges
  
    const flags = discordData.discord_user.public_flags;
  
    const badgeIcons = {
      1: { name: "Staff", icon: "path-to-icons/staff-icon.png" },
      2: { name: "Partner", icon: "path-to-icons/partner-icon.png" },
      64: { name: "HypeSquad Bravery", icon: "path-to-icons/bravery-icon.png" },
      128: { name: "HypeSquad Brilliance", icon: "path-to-icons/brilliance-icon.png" },
      256: { name: "HypeSquad Balance", icon: "https://cdn.discordapp.com/attachments/1311323901367816213/1313172314480840704/balance.png?ex=675124c5&is=674fd345&hm=4b0cfa6d2a4066aa575dc349bc515dc4f1cbe8b56accfeb8f50d7d97690bfc4e&" },
      512: { name: "Early Supporter", icon: "path-to-icons/early-supporter-icon.png" },
      16384: { name: "Verified Bot Developer", icon: "path-to-icons/verified-icon.png" },
    };
  
    for (const [key, badge] of Object.entries(badgeIcons)) {
      if (flags & key) {
        const badgeElement = document.createElement("div");
        badgeElement.className = `badge ${badge.name.toLowerCase().replace(" ", "-")}`;
        badgeElement.innerHTML = `<img src="${badge.icon}" alt="${badge.name}" title="${badge.name}" />`; // Add icon
        badgesContainer.appendChild(badgeElement);
      }
    }
  }
  
        }
    } catch (error) {
        console.error("Failed to fetch Discord data:", error);
    }
}

// Call the function every 15 seconds to keep it updated
updateDiscordStatus();
setInterval(updateDiscordStatus, 15000);

// **AOS Initialization**
AOS.init();

