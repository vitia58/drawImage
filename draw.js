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
const angularFrequencyX = Math.random() * 0.5 + 3.5; // угловая частота
const angularFrequencyY = Math.random() * 0.025 - 0.03 + angularFrequencyX; // угловая частота
const length = 500; // длина нити маятника

const timeY = Math.random() * 0.5; // время, в которое нужно узнать положение
let lastX = 0;
let lastY = 0;
let forNextFrame = 0;
const svg = document.getElementById("mySVG");
(async () => {
  for (let i = 0; i < 17500; i++) {
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
    if (i != 0) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", lastX);
      line.setAttribute("y1", lastY);
      line.setAttribute("x2", x);
      line.setAttribute("y2", y);
      line.setAttribute("stroke", "black");
      line.setAttribute("stroke-width", 0.25);
      svg.appendChild(line);
    }
    lastX = x;
    lastY = y;
    if (!(i%5)) {
    await new Promise((res) => setTimeout(res,5));
    //   forNextFrame = Math.pow(Math.sin((i * Math.PI) / 80000) * 1000, 0.7) + 10;
    }
  }
})();
