const imageFolder = 'images/background/';
const images = ['crevat.png', 'fire.png', 'hardhat.png', 'hammer.png', 'jackpres.png', 'jacksurf.png', 'police.png', 'teach.png']; // Add more image file names here

const usedImages = [];
const lastPositions = [];

function getRandomImage() {
    const availableImages = images.filter(image => !usedImages.includes(image));

    // If not enough images to choose from, reset the used images array
    if (availableImages.length === 0) {
        usedImages.splice(0, usedImages.length - 3);
    }

    // Select a random image
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const selectedImage = availableImages[randomIndex];

    // Update the used images array
    usedImages.push(selectedImage);
    if (usedImages.length > 3) {
        usedImages.shift();
    }

    return selectedImage;
}

const getRandomXPosition = (viewportWidth) => {
    let xPos;
    do {
        xPos = 200 + Math.random() * (viewportWidth - 200); // Ensure it fits within the viewport
    } while (lastPositions.length > 0 && Math.abs(xPos - lastPositions[lastPositions.length - 1]) < 200);

    // Update the last positions array
    lastPositions.push(xPos);
    if (lastPositions.length > 3) {
        lastPositions.shift();
    }

    return xPos;
};

const createFloatingImage = () => {
    const floatingImage = document.createElement('img');
    floatingImage.src = `${imageFolder}${getRandomImage()}`;

    floatingImage.className = 'floating-image';
    floatingImage.style.position = 'absolute';

    // Set a random x-position avoiding the last 3 positions within 200 pixels
    const xPos = getRandomXPosition(window.innerWidth);
    floatingImage.style.left = `${xPos}px`;

    // Set the initial top position relative to the document
    let top = window.scrollY + Math.random() * window.innerHeight;
    floatingImage.style.top = `${top}px`;

    document.body.appendChild(floatingImage);

    // Animate the floating image
    const interval = setInterval(() => {
        top -= 1;
        floatingImage.style.top = `${top}px`;
        if (top > document.body.scrollHeight) {
            clearInterval(interval);
            floatingImage.remove();
        }
    }, 30);

    // Ensure the image scrolls with the page
    window.addEventListener('scroll', () => {
        floatingImage.style.top = `${top - window.scrollY}px`;
    });
};

// Create a new floating image every 8 seconds
setInterval(createFloatingImage, 8000);

// Ensure no multiple creations when leaving and coming back to the page

// Function to toggle sidebar visibility
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('hide-sidebar');
}