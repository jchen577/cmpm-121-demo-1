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
  if (num_clicks == 10) {
    app.append(upgradeButton);
  }
  buttonUpdate();
};
app.append(button);

const count = document.createElement("div");
count.innerHTML = `Buttoned (👾${num_clicks.toFixed(2)}) Times`;
app.append(count);

const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Buy Automatic Clicking (10 clicks)";

let lastTime: number;
let clickedUpgrade: boolean = false;
let growthRate: number = 0;
upgradeButton.onclick = () => {
  if (num_clicks >= 10) {
    num_clicks -= 10;
    clickedUpgrade = true;
    growthRate++;
    upgradeButton.innerHTML = "Upgrade Automatic Clicking (10 clicks)";
    requestAnimationFrame(autoClick);
  }
};
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
}
