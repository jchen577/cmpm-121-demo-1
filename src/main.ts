import "./style.css";

const PRICEGROWTH: number = 1.15;

const app: HTMLDivElement = document.querySelector("#app")!;
document.body.style.backgroundColor = "black";

// Random position within the viewport

const container = document.getElementById("app");
for (let i = 0; i < 100; i++) {
  const star = document.createElement("div");
  star.classList.add("star");

  // Random size for the star
  const size = Math.random() * 3 + 1; // Size between 1px and 4px
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.left = `${Math.random() * 100}vw`;
  star.style.top = `${Math.random() * 100}vh`;
  container?.appendChild(star);
}

const gameName = "👾";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let numClicks: number = 0;
const button = document.createElement("button");
button.innerHTML = "ALIENS👾";
button.onclick = () => {
  numClicks++;
  buttonUpdate();
};
app.append(button);

const count = document.createElement("div");
count.style.color = "white";
count.innerHTML = `Buttoned (👾${numClicks.toFixed(2)}) Times`;
app.append(count);

let growthRate: number = 0;
const growthR = document.createElement("div");
growthR.style.color = "white";
growthR.innerHTML = `Current Growth Rate: ${growthRate}`;
app.append(growthR);

interface shopButton {
  rate: number;
  price: number;
  purchased: number;
  fName: string;
  button: HTMLButtonElement;
  description: string;
}

const availableItems: shopButton[] = [
  {
    purchased: 0,
    price: 10,
    rate: 0.1,
    fName: "Alien Farm",
    button,
    description: "Young Alien Farmer Added To The Field 👒",
  },
  {
    purchased: 0,
    price: 100,
    rate: 2,
    fName: "Alien Breeder",
    button,
    description: "The Date Matcher 💙",
  },
  {
    purchased: 0,
    price: 1000,
    rate: 50,
    fName: "Alien Duplicator",
    button,
    description: "Cheating The System 🖥️",
  },
  {
    purchased: 0,
    price: 10000,
    rate: 1000,
    fName: "Alien Generator",
    button,
    description: "Mass Production 🏭",
  },
  {
    purchased: 0,
    price: 1000000,
    rate: 9999999,
    fName: "???",
    button,
    description: "??? 👹",
  },
];
let lastTime: number;
let clickedUpgrade: boolean = false;

function autoClick(timestamp: number) {
  if (clickedUpgrade) {
    lastTime = timestamp;
    clickedUpgrade = false;
  }
  numClicks += growthRate * ((timestamp - lastTime) / 1000);
  lastTime = timestamp;
  buttonUpdate();
  requestAnimationFrame(autoClick);
}

for (let b = 0; b < availableItems.length; b++) {
  const currButton = document.createElement("button");
  const desc = document.createElement("div");
  desc.style.color = "white";
  desc.innerHTML = availableItems[b].description;
  currButton.innerHTML = `Upgrade ${availableItems[b].fName} (${availableItems[b].price} clicks for ${availableItems[b].rate} aliens/sec)(Bought ${availableItems[b].purchased} Times)`;
  availableItems[b].button = currButton;
  currButton.onclick = () => {
    if (numClicks >= availableItems[b].price) {
      numClicks -= availableItems[b].price;
      availableItems[b].price = availableItems[b].price * PRICEGROWTH;
      clickedUpgrade = true;
      growthRate += availableItems[b].rate;
      availableItems[b].purchased++;
      requestAnimationFrame(autoClick);
    }
  };
  availableItems[b].button.disabled = true;
  app.append(currButton);
  app.append(desc);
}
function buttonUpdate() {
  count.innerHTML = `Buttoned (${numClicks.toFixed(2)}) Times`;
  growthR.innerHTML = `Current Growth Rate: ${growthRate.toFixed(2)}`;
  updateButtonText();
}
function updateButtonText() {
  for (let b = 0; b < availableItems.length; b++) {
    availableItems[b].button.innerHTML =
      `Upgrade ${availableItems[b].fName} (${availableItems[b].price.toFixed(2)} clicks for ${availableItems[b].rate} aliens/sec)(Bought ${availableItems[b].purchased} Times)`;
    disableButtonCheck(b);
  }
}
function disableButtonCheck(index: number) {
  if (numClicks >= availableItems[index].price) {
    availableItems[index].button.disabled = false;
  } else {
    availableItems[index].button.disabled = true;
  }
}
