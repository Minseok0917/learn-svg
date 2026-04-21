const $ = (query) => document.querySelector(query);
const $$ = (query) => [...document.querySelectorAll(query)];

const $app = $("#app");
const $svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
$app.append($svg);

let balls = [
  {
    x: 100,
    y: 100,
    radius: 10,
    element: null,
    speedX: 2,
    speedY: 2,
  },
];

function handleResize() {
  $svg.setAttribute("width", window.innerWidth);
  $svg.setAttribute("height", window.innerHeight);
  $svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
}

function animate() {
  balls.forEach((ball) => {
    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (!ball.element) {
      ball.element = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      $svg.appendChild(ball.element);
    }

    ball.element.setAttribute("cx", ball.x);
    ball.element.setAttribute("cy", ball.y);
    ball.element.setAttribute("r", ball.radius);
    ball.element.setAttribute("fill", "red");

    if (ball.x + ball.radius > window.innerWidth || ball.x - ball.radius < 0) {
      ball.speedX = -ball.speedX;
    }

    if (ball.y + ball.radius > window.innerHeight || ball.y - ball.radius < 0) {
      ball.speedY = -ball.speedY;
    }
  });
  requestAnimationFrame(animate);
}

window.addEventListener("resize", handleResize);

handleResize();

requestAnimationFrame(animate);
