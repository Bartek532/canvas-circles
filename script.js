const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const maxRadius = 45;
const minRadius = 4;

const mouse = {
  x: undefined,
  y: undefined,
};

class Circle {
  constructor(x, y, radius, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  move() {
    if (
      mouse.x - this.x < 50 &&
      mouse.x - this.x > -50 &&
      mouse.y - this.y < 50 &&
      mouse.y - this.y > -50
    ) {
      if (this.radius < maxRadius) {
        this.radius += 2;
      }
    } else if (this.radius > minRadius) {
      this.radius -= 2;
    }

    if (this.x <= this.radius || this.x >= canvas.width - this.radius) {
      this.speedX = -this.speedX;
    } else if (this.y <= this.radius || this.y >= canvas.height - this.radius) {
      this.speedY = -this.speedY;
    }
    this.x += this.speedX;
    this.y += this.speedY;

    this.draw();
  }
}

const circleArray = [];
const colorArray = ["#809fff", "#ff4d4d", "#99ff99", "#6666cc"];

const drawCircles = (() => {
  circleArray.length = 0;
  for (let i = 0; i < 900; i++) {
    const radius = Math.random() * (5 - 0.2 + 1) + 0.2;
    const startX =
      Math.random() * (canvas.width - radius - radius + 1) + radius;
    const startY =
      Math.random() * (canvas.height - radius - radius + 1) + radius;
    const speedX = (Math.random() - 0.5) * 4;
    const speedY = (Math.random() - 0.5) * 4;
    const color = Math.floor(Math.random() * colorArray.length);

    circleArray.push(
      new Circle(startX, startY, radius, speedX, speedY, colorArray[color])
    );
    circleArray[i].draw();
  }
})();

const moveCircles = () => {
  requestAnimationFrame(moveCircles);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  circleArray.forEach(circle => {
    circle.move();
  });
};

moveCircles();

window.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawCircles();
});
