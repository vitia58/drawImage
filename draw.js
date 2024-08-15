function getPosition(time, initialPosition, initialVelocity, dampingCoefficient, angularFrequency) {
  const exponentialDecay = Math.exp(-dampingCoefficient * time);
  const amplitude = Math.sqrt(
    Math.pow(initialPosition, 2) +
      Math.pow(initialVelocity + dampingCoefficient * initialPosition, 2) /
        Math.pow(angularFrequency, 2),
  );
  const phase = Math.atan(
    (initialVelocity + dampingCoefficient * initialPosition) / (angularFrequency * initialPosition),
  );

  return (amplitude * exponentialDecay * Math.cos(angularFrequency * time - phase) * Math.PI) / 180;
}
const initialPositionX = Math.random() * 20 + 30; // начальное отклонение (градусы)
const initialPositionY = Math.random() * 20 + 30; // начальное отклонение (градусы)
const initialVelocity = 0; // начальная скорость
const dampingCoefficient = 0.005; // коэффициент затухания
const angularFrequencyX = Math.random() * 10; // угловая частота
const angularFrequencyY = Math.random() * 10; // угловая частота
const length = 500; // длина нити маятника

const timeY = 0; // время, в которое нужно узнать положение
console.log({ initialPositionX, initialPositionY, angularFrequencyX, angularFrequencyY, timeY });
let lastX = 0;
let lastY = 0;
let forNextFrame = 0;
const svg = document.getElementById("mySVG");

const updateVh = () => {
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};
updateVh();
window.onresize = updateVh;
const color = (n) => {
  const p = n % 765;
  return (
    "#" +
    (
      0x1000000 +
      (Math.min(p, 255) - Math.min(Math.max(p, 255), 510) + 255) * 0x10000 +
      (Math.min(Math.max(p, 255), 510) - Math.min(Math.max(p, 510), 765) + 255) * 0x100 +
      (Math.max(p, 510) - Math.min(p, 255) - 255)
    )
      .toString(16)
      .substring(1)
      .toUpperCase()
  );
};
(async () => {
  for (let i = 0; i < 20000; i++) {
    const thetaX = getPosition(
      Math.pow(i / 90.0, 1.25),
      initialPositionX,
      initialVelocity,
      dampingCoefficient,
      angularFrequencyX,
    );
    const x = length * Math.sin(thetaX) + 450;
    const thetaY = getPosition(
      Math.pow(i / 90.0, 1.25) + timeY,
      initialPositionY,
      initialVelocity,
      dampingCoefficient,
      angularFrequencyY,
    );
    const y = length * Math.sin(thetaY) + 450;
    if (i !== 0) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", lastX);
      line.setAttribute("y1", lastY);
      line.setAttribute("x2", x);
      line.setAttribute("y2", y);
      line.setAttribute("stroke", color(i));
      line.setAttribute("stroke-width", 0.25);
      svg.appendChild(line);
    }
    lastX = x;
    lastY = y;
    if (!(i % 5)) {
      await new Promise((res) => setTimeout(res, 5));
      //   forNextFrame = Math.pow(Math.sin((i * Math.PI) / 80000) * 1000, 0.7) + 10;
    }
  }
})();
