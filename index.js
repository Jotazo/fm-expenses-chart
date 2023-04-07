import data from "./data.json" assert { type: "json" };

const indexMaxAmount = data.reduce(
  (acc, prev, index) => {
    if (prev.amount > acc.amount) {
      acc = { amount: prev.amount, index };
      return acc;
    }
    return acc;
  },
  { amount: 0, index: 0 }
).index;

const mainSection = document.querySelector("section.card-main-charts");

const createSection = () => {
  const section = document.createElement("section");
  section.classList.add("card-main-chart");
  return section;
};

const createTooltip = (amount) => {
  const span = document.createElement("span");
  span.classList.add("card-main-chart-tooltip");
  span.textContent = `$${amount}`;
  return span;
};

const createChartBar = (height, index, tooltip) => {
  const div = document.createElement("div");
  div.classList.add("card-main-chart-bar");
  if (index === indexMaxAmount) {
    div.classList.add("active");
  }
  div.style.height = `${height * 3}px`;
  div.addEventListener("mouseover", () => {
    tooltip.style.backgroundColor = "#333";
  });
  div.addEventListener("mouseout", () => {
    tooltip.style.backgroundColor = "#fff";
  });
  return div;
};

const createSpan = (textContent) => {
  const span = document.createElement("span");
  span.classList.add("card-main-chart-month");
  span.textContent = textContent;
  return span;
};

data.forEach((el, index) => {
  const section = createSection();
  const tooltip = createTooltip(el.amount);
  const divChartBar = createChartBar(el.amount, index, tooltip);
  const span = createSpan(el.day);
  section.appendChild(tooltip);
  section.appendChild(divChartBar);
  section.appendChild(span);
  mainSection.appendChild(section);
});
