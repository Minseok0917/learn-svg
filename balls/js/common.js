const $ = (query) => document.querySelector(query);
const $$ = (query) => [...document.querySelectorAll(query)];
const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const $app = $("#app");
const $svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
$app.append($svg);

let balls = [];
for (let i = 0; i < 100; i++) {
  const radius = random(10, 30);
  let speedX = random(-3, 3);
  let speedY = random(-3, 3);

  while (speedX === 0 || speedY === 0) {
    speedX = random(-3, 3);
    speedY = random(-3, 3);
  }

  balls.push({
    x: random(radius, window.innerWidth - radius),
    y: random(radius, window.innerHeight - radius),
    radius: radius,
    speedX: speedX,
    speedY: speedY,
    element: null,
  });
}

const $filter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
$filter.setAttribute("id", "gooey");

const $filterBlur = document.createElementNS("http://www.w3.org/2000/svg", "feGaussianBlur");
$filterBlur.setAttribute("stdDeviation", "8");

const $filterColorMatrix = document.createElementNS("http://www.w3.org/2000/svg", "feColorMatrix");
$filterColorMatrix.setAttribute("type", "matrix");
$filterColorMatrix.setAttribute("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 18 -7");

$filter.append($filterBlur, $filterColorMatrix);
$svg.append($filter);

const $g = document.createElementNS("http://www.w3.org/2000/svg", "g");
$g.setAttribute("filter", "url(#gooey)");

$svg.append($g);

// const $circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
// $circle.setAttribute("cx", "100");
// $circle.setAttribute("cy", "100");
// $circle.setAttribute("r", "10");
// $circle.setAttribute("fill", "red");
// $g.append($circle);

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
      $g.appendChild(ball.element);
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
