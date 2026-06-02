document.addEventListener("DOMContentLoaded", function () {
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    document.body.appendChild(overlay);

    const imageDirectory = "./2001eyes/";
    const images = [
        "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg",
        "6.jpg", "7.jpg", "8.jpg", "9.jpg",
        "21.jpg", "22.jpg", "23.jpg", "24.jpg", "25.jpg",
        "26.jpg", "27.jpg", "28.jpg", "29.jpg", "30.jpg"
    ];

    let overlayEnabled = true;
    let fadeInOutEnabled = true;
    let overlayVisible = false;
    let hideTimer = null;
    let nextTimer = null;

    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
    }

    function showOverlay() {
        if (!overlayEnabled) return;

        const randomImage = getRandomImage();
        const imagePath = `${imageDirectory}${randomImage}`;

        overlay.style.backgroundImage = `url("${imagePath}")`;
        overlay.style.display = "block";
        overlay.style.opacity = "0.5";
        overlayVisible = true;

        if (hideTimer) clearTimeout(hideTimer);

        if (fadeInOutEnabled) {
            hideTimer = setTimeout(hideOverlay, 1200);
        } else {
            hideTimer = setTimeout(hideOverlay, 600);
        }
    }

    function hideOverlay() {
        overlay.style.opacity = "0";
        overlayVisible = false;

        setTimeout(() => {
            if (!overlayVisible) {
                overlay.style.display = "none";
            }
        }, 1000);

        scheduleNextOverlay();
    }

    function scheduleNextOverlay() {
        if (!overlayEnabled) return;

        if (nextTimer) clearTimeout(nextTimer);

        const delay = Math.floor(Math.random() * 10000) + 5000; // 5-15 seconds
        nextTimer = setTimeout(showOverlay, delay);
    }

    function displayMessage(message) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);

        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 5000);
    }

    document.addEventListener("keydown", function (event) {
        const key = event.key.toLowerCase();
			console.log("Key pressed:", event.key);


        if (key === "o") {
            overlayEnabled = !overlayEnabled;

            if (overlayEnabled) {
                displayMessage("Overlay On");
				console.log("Overlay On");
    
                scheduleNextOverlay();
                
            } else {
                displayMessage("Overlay Off");
                if (hideTimer) clearTimeout(hideTimer);
				if (nextTimer) clearTimeout(nextTimer);
                console.log("Overlay Off");

                hideOverlay();
            }
        } else if (key === "f") {
            fadeInOutEnabled = !fadeInOutEnabled;
            displayMessage(fadeInOutEnabled ? "Fade On" : "Fade Off");
            console.log(`Fade In/Out ${fadeInOutEnabled ? "Enabled" : "Disabled"}`);
        }
    });

    scheduleNextOverlay();
});