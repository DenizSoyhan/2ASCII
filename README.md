<p align="center">
  <img src="https://github.com/user-attachments/assets/a20c0673-3d13-406e-811a-7eba5ccdc4d0" alt="banner">
</p>


This is a web app that turns your Images to ASCII art and let you download them as images that you can check out [here](https://denizsoyhan.github.io/2ASCII/).

<p align="center">
  <img src="https://github.com/user-attachments/assets/341ef257-1f04-4c96-b8cc-62f6be8658c3" alt="originalImg" width="280" style="display: inline-block;">
  <img src="https://github.com/user-attachments/assets/953b7015-b9da-4d3f-8a23-cf28f7168589" alt="convertedImg" width="300" style="display: inline-block;">
</p>

# 1) ASCII Art
>* ASCII art is a well known thing that was quite easy to implement. You can upload your image and it will grayscale the image (will add colors in the future). Then based on the brightness of the pixels it will write a character in that place on the canvas element. The character array is this at the moment:
````javascript
        const chars = ' .:-=+*%@#'; // ASCII characters in increasing intensity
````
>* You can download the image on your machine or copy paste and alter it as you like before copy pasting it around!<br>
<p align="center">
  <img src="https://github.com/user-attachments/assets/f9927195-d9be-4660-a14b-8a9211574f95" alt="downloadCopyImg" width="600">
</p>

# 2) To be added in the future:
>* Option to reverse the bright and dark values
>* Add a color picker so the bright and dark values can be different colors other than black and white for the image
>* Option to keep the original image colors.
>* Option to change width and height of the canvas so the image and the text can be adjusted.
>* Based on the changing width and height dynamically change the ASCII character array so smaller pictures can be communicated better with smaller characters.

