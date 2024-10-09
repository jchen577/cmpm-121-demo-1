import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Check it out!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let num_clicks: number = 0;
const button = document.createElement("button");
button.innerHTML = "ALIENS👾";
button.onclick = () => {
  num_clicks++;
  buttonUpdate();
};
app.append(button);

const count = document.createElement("div");
count.innerHTML = `Buttoned (👾${num_clicks.toFixed(2)}) Times`;
app.append(count);

let growthRate: number = 0;
const growthR = document.createElement("div");
growthR.innerHTML = `Current Growth Rate: ${growthRate}`;
app.append(growthR);

interface shopButton {
  rate: number;
  price: number;
  purchased: number;
  fName: string;
  button: HTMLButtonElement;
}

const availableItems: shopButton[] = [
  { purchased: 0, price: 10, rate: 0.1, fName: "Alien Farm", button },
  { purchased: 0, price: 100, rate: 2, fName: "Alien Breeder", button },
  { purchased: 0, price: 1000, rate: 50, fName: "Alien Duplicator", button },
];
let lastTime: number;
let clickedUpgrade: boolean = false;

function autoClick(timestamp: number) {
  if (clickedUpgrade) {
    lastTime = timestamp;
    clickedUpgrade = false;
  }
  num_clicks += growthRate * ((timestamp - lastTime) / 1000);
  lastTime = timestamp;
  buttonUpdate();
  requestAnimationFrame(autoClick);
}

for (let b = 0; b < availableItems.length; b++) {
  const currButton = document.createElement("button");
  currButton.innerHTML = `Upgrade ${availableItems[b].fName} (${availableItems[b].price} clicks for ${availableItems[b].rate} aliens/sec)(Bought ${availableItems[b].purchased} Times)`;
  availableItems[b].button = currButton;
  currButton.onclick = () => {
    if (num_clicks >= availableItems[b].price) {
      num_clicks -= availableItems[b].price;
      availableItems[b].price = availableItems[b].price * 1.15;
      clickedUpgrade = true;
      growthRate += availableItems[b].rate;
      availableItems[b].purchased++;
      requestAnimationFrame(autoClick);
    }
  };
  availableItems[b].button.disabled = true;
  app.append(currButton);
}
function buttonUpdate() {
  count.innerHTML = `Buttoned (${num_clicks.toFixed(2)}) Times`;
  growthR.innerHTML = `Current Growth Rate: ${growthRate.toFixed(2)}`;
  for (let b = 0; b < availableItems.length; b++) {
    availableItems[b].button.innerHTML =
      `Upgrade ${availableItems[b].fName} (${availableItems[b].price.toFixed(2)} clicks for ${availableItems[b].rate} aliens/sec)(Bought ${availableItems[b].purchased} Times)`;
    if (num_clicks >= availableItems[b].price) {
      availableItems[b].button.disabled = false;
    } else {
      availableItems[b].button.disabled = true;
    }
  }
}
