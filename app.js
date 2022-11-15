let paper = document.querySelector("#paper");

paper.addEventListener("mousemove", (e) => {
  if (e.buttons === 1) {
    let y = Math.floor(e.clientY / 5);
    let x = Math.floor(e.clientX / 5);

    pixels[y][x].color = "red";
    pixels[y][x].needsUpdate = true;
    renderImage(pixels, true);
    console.log(x, y);
  }
});

const createImage = () => {
  let image = []; // Array

  for (let y = 0; y < 100; y++) {
    let row = [];
    for (let x = 0; x < 100; x++) {
      row.push({
        color: "#00000000",
        needsUpdate: true,
      });
    }

    image.push(row);
  }
  return image;
};

const renderImage = (image, update = false) => {
  let wrapper = undefined;
  if (!update) {
    paper.innerHTML = "";

    // groups al 10000 divs
    wrapper = document.createElement("div");
  }

  for (let y = 0; y < 100; y++) {
    for (let x = 0; x < 100; x++) {
      // OPTIMIZATION 2:
      // update only the affected DIV
      if (image[y][x].needsUpdate) {
        if (update) {
          let div = document.getElementById(`p-${y}-${x}`);
          div.style.backgroundColor = image[y][x].color;
        } else {
          let div = document.createElement("div");
          div.id = `p-${y}-${x}`;
          div.classList.add("point");

          div.style.backgroundColor = image[y][x].color;

          // OPTIMIZATION 1:

          wrapper.appendChild(div);
          image[y][x].needsUpdate = false;
        }
      }
    }
  }
  if (!update) {
    paper.appendChild(wrapper);
  }
};

let pixels = createImage();

renderImage(pixels);
