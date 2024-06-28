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
        xPos = Math.random() * (viewportWidth - 200); // Ensure it fits within the viewport
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

    // Set a random x-position avoiding the last 3 positions within 200 pixels
    const xPos = getRandomXPosition(window.innerWidth);
    floatingImage.style.left = `${xPos}px`;

    document.body.appendChild(floatingImage);

    // Animate the floating image
    let bottom = -100;
    const interval = setInterval(() => {
        bottom += 1;
        floatingImage.style.bottom = `${bottom}px`;
        if (bottom > window.innerHeight) {
            clearInterval(interval);
            floatingImage.remove();
        }
    }, 30);
};

// Create a new floating image every 4 seconds
setInterval(createFloatingImage, 8000);
