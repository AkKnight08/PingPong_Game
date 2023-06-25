import Ball from "./ball.js";
import Player from "./player.js";
if (localStorage.getItem("hs") > 1)
  alert(
    "Current High Score " +
      localStorage.getItem("hs") +
      ". If you lose 5 games then game ends"
  );
else alert(" Welcome.If you lose 5 games then game ends");
let roundnumber = 1;
let p1s = 0;
let p2s = 0;
const p1sn = document.getElementById("ps1");
const p2sn = document.getElementById("ps2");
const roundnum = document.getElementById("roundnum");
let rnf = true;
const ball = new Ball(document.getElementById("ball")); // ball element
const player1 = new Player(document.getElementById("bar1"));
const player2 = new Player(document.getElementById("bar2"));
var p1 = document.getElementById("p1");
var p2 = document.getElementById("p2");
var winner = document.getElementById("round");
let lasttime;
function update(time) {
  if (lasttime != null) {
    const delta = time - lasttime;
    if (p2s === 5) {
      alert("you Lose start Again by Refreshing");
      return;
    }
    if (p1sn > localStorage.getItem("hs")) {
      localStorage.setItem("hs", p1s);
    }
    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );
    document.documentElement.style.setProperty("--hue", hue + delta * 0.01);
    ball.update(delta, [player1.rect(), player2.rect()]);
    player2.update(delta, ball.y);
    roundnum.innerText = "Round " + roundnumber.toString();
    p1sn.innerText = "Player 1 - " + p1s.toString();
    p2sn.innerText = "Player 2 - " + p2s.toString();
    if (islose()) {
      handlelose();
    }
  }
  lasttime = time;
  window.requestAnimationFrame(update);
}
// setInterval(update,10); , may not always run for 10ms and may call between frames
window.requestAnimationFrame(update); // every frame calls update
function handlelose() {
  const rect = ball.rect();
  if (
    (Number(p1.textContent) === 5 || Number(p2.textContent) === 5) &&
    rnf === true
  ) {
    if (Number(p1.innerText) === 5) {
      winner.innerText = "Player 1 Wins";
      p1s++;
    } else {
      winner.innerText = "Player 2 Wins";
      p2s++;
    }
    rnf = false;
    roundnumber++;
    winner.style.opacity = "1";
    winner.style.transition = "0.5s ease-in-out";
    ball.reset();
    player1.reset();
    player2.reset();
    setTimeout(function () {
      p1.textContent = "0";
      p2.textContent = "0";
      winner.style.opacity = "0";
      winner.style.transition = "0.2s ease-in-out";
      winner.style.opacity = "0";
      ball.reset();
      rnf = true;
    }, 4000);
    return;
  }
  if (rect.right >= window.innerWidth) {
    p1.textContent = parseInt(p1.textContent) + 1;
  } else {
    rnf = true;
    p2.textContent = parseInt(p2.textContent) + 1;
  }
  ball.reset();
  player1.reset();
  player2.reset();
}
function islose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}
document.addEventListener("mousemove", (e) => {
  player1.position = (e.y / window.innerHeight) * 100;
});
