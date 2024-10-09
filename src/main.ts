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
const butt1Count = 0;
const butt2Count = 0;
const butt3Count = 0;
const upgradeButton = createShopButton(
  10,
  0.1,
  `Upgrade Automatic Clicking (10 clicks for 0.1 aliens/sec)`,
  butt1Count
);
const upgradeButton2 = createShopButton(
  100,
  2.0,
  `Upgrade Automatic Clicking (100 clicks for 2 aliens/sec)`,
  butt2Count
);
const upgradeButton3 = createShopButton(
  1000,
  50.0,
  `Upgrade Automatic Clicking (1000 clicks for 50 aliens/sec)`,
  butt3Count
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
  upgradeButton.innerHTML = `Upgrade Automatic Clicking (10 clicks for 0.1 aliens/sec)(Bought ${butt1Count} Times)`;
  upgradeButton2.innerHTML = `Upgrade Automatic Clicking (100 clicks for 2 aliens/sec)(Bought ${butt2Count} Times)`;
  upgradeButton3.innerHTML = `Upgrade Automatic Clicking (1000 clicks for 50 aliens/sec)(Bought ${butt3Count} Times)`;
  if (num_clicks >= 10) {
    upgradeButton.disabled = false;

    if (num_clicks >= 100) {
      upgradeButton2.disabled = false;
    }
    if (num_clicks >= 1000) {
      upgradeButton3.disabled = false;
    }
  } else {
    upgradeButton.disabled = true;
    upgradeButton2.disabled = true;
    upgradeButton3.disabled = true;
  }
}

function createShopButton(
  cost: number,
  growth: number,
  text: string,
  buttNum: number
) {
  const button = document.createElement("button");
  buttNum++;
  button.innerHTML = text;
  button.disabled = true;
  app.append(button);
  button.onclick = () => {
    if (num_clicks >= cost) {
      num_clicks -= cost;
      clickedUpgrade = true;
      growthRate += growth;
      requestAnimationFrame(autoClick);
    }
  };
  return button;
}
