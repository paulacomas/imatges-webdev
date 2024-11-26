async function getImageInfo(imgElement) {
  return new Promise(async (resolve, reject) => {
    const img = new Image();
    img.src = imgElement.src; // Fem servir el `src` de l'element `img` original

    img.onload = async () => {
      try {
        const response = await fetch(imgElement.src);
        const blob = await response.blob();
        const format = imgElement.src.split(".").pop();
        const dimensions = {
          width: img.width,
          height: img.height,
        };
        const alt = imgElement.alt || "No alt text"; // Recuperem l'alt directament de l'element original
        const size = blob.size;

        resolve({ format, dimensions, alt, size });
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = reject;
  });
}

function displayImageInfo(imgElement, container) {
  getImageInfo(imgElement)
    .then((info) => {
      const formatElement = document.createElement("p");
      formatElement.textContent = `Format: ${info.format}`;
      container.appendChild(formatElement);

      const dimensionsElement = document.createElement("p");
      dimensionsElement.textContent = `Dimensions: ${info.dimensions.width}x${info.dimensions.height}`;
      container.appendChild(dimensionsElement);

      const altElement = document.createElement("p");
      altElement.textContent = `Alt: ${info.alt}`;
      container.appendChild(altElement);

      const sizeInKB = (info.size / 1024).toFixed(2);
      const sizeElement = document.createElement("p");
      sizeElement.textContent = `Size: ${sizeInKB} KB`;
      container.appendChild(sizeElement);
    })
    .catch(console.error);
}

const images = Array.from(document.querySelectorAll("img"));
const infoContainers = Array.from(document.querySelectorAll(".image-info"));

images.forEach((img, i) => {
  displayImageInfo(img, infoContainers[i]);
});
