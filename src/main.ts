import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Check it out!";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let num_clicks = 0;
const button = document.createElement("button");
button.innerHTML = "I'm button";
button.onclick = () => {
    num_clicks++;
    button.innerHTML = `Buttoned (${num_clicks}) Times`;
}
app.append(button);
