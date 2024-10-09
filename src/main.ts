import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Check it out!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let num_clicks: number = 0;
const button = document.createElement("button");
button.innerHTML = "👾";
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

/*const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Buy Automatic Clicking (10 clicks)";
upgradeButton.disabled = true;
app.append(upgradeButton);*/
interface shopButton {
  button: HTMLButtonElement;
  purchased: number;
  price: number;
}
const upgradeButton = createShopButton(
  10,
  0.1,
  `Upgrade Automatic Clicking (10 clicks for 0.1 aliens/sec)`
);
const upgradeButton2 = createShopButton(
  100,
  2.0,
  `Upgrade Automatic Clicking (100 clicks for 2 aliens/sec)`
);
const upgradeButton3 = createShopButton(
  1000,
  50.0,
  `Upgrade Automatic Clicking (1000 clicks for 50 aliens/sec)`
);
let lastTime: number;
let clickedUpgrade: boolean = false;
/*upgradeButton.onclick = () => {
  if (num_clicks >= 10) {
    num_clicks -= 10;
    clickedUpgrade = true;
    growthRate++;
    upgradeButton.innerHTML = "Upgrade Automatic Clicking (10 clicks)";
    requestAnimationFrame(autoClick);
  }
};*/
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

function buttonUpdate() {
  count.innerHTML = `Buttoned (${num_clicks.toFixed(2)}) Times`;
  growthR.innerHTML = `Current Growth Rate: ${growthRate.toFixed(2)}`;
  upgradeButton.button.innerHTML = `Upgrade Automatic Clicking (${upgradeButton.price.toFixed(2)} clicks for 0.1 aliens/sec)(Bought ${upgradeButton.purchased} Times)`;
  upgradeButton2.button.innerHTML = `Upgrade Automatic Clicking (${upgradeButton2.price.toFixed(2)} clicks for 2 aliens/sec)(Bought ${upgradeButton2.purchased} Times)`;
  upgradeButton3.button.innerHTML = `Upgrade Automatic Clicking (${upgradeButton3.price.toFixed(2)} clicks for 50 aliens/sec)(Bought ${upgradeButton3.purchased} Times)`;
  if (num_clicks >= upgradeButton.price) {
    upgradeButton.button.disabled = false;

    if (num_clicks >= upgradeButton2.price) {
      upgradeButton2.button.disabled = false;
    }
    if (num_clicks >= upgradeButton3.price) {
      upgradeButton3.button.disabled = false;
    }
  } else {
    upgradeButton.button.disabled = true;
    upgradeButton2.button.disabled = true;
    upgradeButton3.button.disabled = true;
  }
}

function createShopButton(cost: number, growth: number, text: string) {
  const button = document.createElement("button");
  button.innerHTML = text;
  button.disabled = true;
  const count = 0;
  app.append(button);
  const shopButt = {} as shopButton;
  shopButt.button = button;
  shopButt.purchased = count;
  shopButt.price = cost;
  button.onclick = () => {
    if (num_clicks >= shopButt.price) {
      num_clicks -= shopButt.price;
      shopButt.price = shopButt.price * 1.15;
      clickedUpgrade = true;
      growthRate += growth;
      shopButt.purchased++;
      requestAnimationFrame(autoClick);
    }
  };
  return shopButt;
}
