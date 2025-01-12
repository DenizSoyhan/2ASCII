const fileInput = document.getElementById('fileInput');
const convertButton = document.getElementById('convertButton');
const output = document.getElementById('output');
const downloadButton = document.getElementById('downloadButton');
const asciiCanvas = document.getElementById('asciiCanvas');

let asciiArt = '';

convertButton.addEventListener('click', () => {
    const file = fileInput.files[0];
    if (!file) {
        alert('Please upload an image file!');
        return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;

        img.onload = () => {
            const aspectRatio = img.height / img.width;
            const canvasWidth = 100; 
            const canvasHeight = Math.round(canvasWidth * aspectRatio * 0.55); //can be changed to make font fit

            const canvas = document.createElement('canvas');
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            asciiArt = convertToASCII(imageData);

            // Update the canvas with the ASCII art
            const fontSize = 10; // Font size in pixels for each character
            const charWidth = fontSize * 0.6; //adjusted width acording to monospace characters
            const charHeight = fontSize; // Height of a monospace character
            const lines = asciiArt.split('\n');
            const cols = lines[0].length;

            // Adjust canvas size based on ASCII dimensions
            asciiCanvas.width = cols * charWidth;
            asciiCanvas.height = lines.length * charHeight;

            const asciiCtx = asciiCanvas.getContext('2d');
            asciiCtx.fillStyle = '#000'; //color of the background (black in this instance)
            asciiCtx.fillRect(0, 0, asciiCanvas.width, asciiCanvas.height);

            asciiCtx.font = `${fontSize}px monospace`;
            asciiCtx.fillStyle = '#fff'; //color of the characters (white in this instance)
            asciiCtx.textBaseline = 'top';

            lines.forEach((line, index) => {
                asciiCtx.fillText(line, 0, index * charHeight);
            });

            // Show the download button after the file is converted
            downloadButton.style.display = 'inline-block';
        };
    };

    reader.readAsDataURL(file);
});

downloadButton.addEventListener('click', () => {
    if (!asciiArt) {
        alert('Please convert an image to ASCII first!');
        return;
    }

    const file = fileInput.files[0];
    if (!file) {
        alert('Please upload an image first!');
        return;
    }
    let originalFileName = file.name;

    let formattedFileName = originalFileName.replace(/\.[^/.]+$/, '') + "ASCII.png";//regex for .png part of the file

    // Create download link
    const link = document.createElement('a');
    link.download = formattedFileName;
    link.href = asciiCanvas.toDataURL();
    link.click();
});

function convertToASCII(imageData) {
    const chars = ' .:-=+*%@#'; // ASCII characters in increasing intensity
    let ascii = '';

    for (let y = 0; y < imageData.height; y++) {
        for (let x = 0; x < imageData.width; x++) {
            const i = (y * imageData.width + x) * 4; // Index in image data array
            const r = imageData.data[i];
            const g = imageData.data[i + 1];
            const b = imageData.data[i + 2];

            // Convert to grayscale
            const gray = (r + g + b) / 3;

            // Map grayscale value to character
            const charIndex = Math.floor((gray / 255) * (chars.length - 1));
            ascii =ascii + chars[charIndex];
        }
        ascii =ascii + '\n'; // New line at the end of each row
    }

    return ascii;
}
