import "./style.css";
import { Billing, Plan } from "./types";

const sliderElem: HTMLInputElement = document.querySelector("#slider")!;
const pageViewsElem: HTMLParagraphElement =
  document.querySelector("#pageviews")!;
const priceElem: HTMLParagraphElement = document.querySelector("#price")!;
const switchElem: HTMLInputElement = document.querySelector("#switch")!;
const discountMobileElem: HTMLSpanElement =
  document.querySelector("#discount-mobile")!;
const discountDesktopElem: HTMLSpanElement =
  document.querySelector("#discount-desktop")!;
const buttonElem: HTMLButtonElement = document.querySelector("#button")!;
const modalElem: HTMLDivElement = document.querySelector("#modal")!;
const modalCloseElem: HTMLButtonElement =
  document.querySelector("#modal-close")!;
const planElem: HTMLSpanElement = document.querySelector("#plan")!;
const monthlyCostElem: HTMLSpanElement =
  document.querySelector("#monthly-cost")!;
const totalCostElem: HTMLParagraphElement =
  document.querySelector("#total-cost")!;

const plans: Plan[] = [
  { id: 0, pageViews: 10000, pageViewsText: "10k", pricePerMonth: 8 },
  { id: 1, pageViews: 50000, pageViewsText: "50k", pricePerMonth: 12 },
  { id: 2, pageViews: 100000, pageViewsText: "100k", pricePerMonth: 16 },
  { id: 3, pageViews: 500000, pageViewsText: "500k", pricePerMonth: 24 },
  { id: 4, pageViews: 1000000, pageViewsText: "1m", pricePerMonth: 36 },
];

// Dynamic values
let selectedPlan = plans[2];
let selectedBilling: Billing = "monthly";
const yearlyDiscountValue = 0.25;

const getPricePerMonth = () =>
  selectedBilling === "yearly"
    ? (1 - yearlyDiscountValue) * selectedPlan.pricePerMonth
    : selectedPlan.pricePerMonth;

const updateView = () => {
  pageViewsElem.textContent = `${selectedPlan.pageViewsText} pageviews`;
  const cost = getPricePerMonth();
  priceElem.textContent = `${cost.toFixed(2)}$`;
};

const setSelectedPlan = (id: number) => {
  const plan = plans[id];
  selectedPlan = plan;
  updateView();
};

const sliderOnChangeCallback = (ev: Event) => {
  const value = (ev.target as HTMLInputElement).value;
  setSelectedPlan(Number(value));
};

const setupSlider = (
  sliderElem: HTMLInputElement,
  plans: Plan[],
  initialValue: number
) => {
  const n = plans.length;
  sliderElem.min = "0";
  sliderElem.max = (n - 1).toString();
  sliderElem.step = "1";
  sliderElem.defaultValue = String(initialValue);

  sliderElem.addEventListener("input", sliderOnChangeCallback);
};

const switchOnChangeCallback = (ev: Event) => {
  const isYearly = (ev.target as HTMLInputElement).checked;
  if (isYearly) selectedBilling = "yearly";
  else selectedBilling = "monthly";
  updateView();
};

const setupSwitch = (switchElem: HTMLInputElement, billing: Billing) => {
  selectedBilling = billing;
  if (billing === "yearly") switchElem.checked = true;
  switchElem.addEventListener("change", switchOnChangeCallback);
};

const setupDiscounts = (
  discountElems: HTMLSpanElement[],
  discountValue: number
) => {
  discountElems.forEach((elem) => {
    const currentValue = elem.textContent;
    const newValue = currentValue!.replace(
      "x",
      (discountValue * 100).toString()
    );
    elem.textContent = newValue;
  });
};

const buttonOnClickCallback = () => {
  if (!selectedPlan || !selectedBilling) return;
  console.log(selectedPlan, selectedBilling, yearlyDiscountValue);

  openModal();
};

const setupButton = (buttonElem: HTMLButtonElement) =>
  buttonElem.addEventListener("click", buttonOnClickCallback);

const openModal = () => {
  planElem.textContent = `${selectedPlan.pageViewsText} Pageviews`;

  const cost = getPricePerMonth();

  monthlyCostElem.textContent = `${cost.toFixed(2)}$`;
  totalCostElem.textContent = `Total: ${(cost * 12).toFixed(2)}$ /yr`;

  modalElem.classList.add("open");
};

const setupApp = (
  plans: Plan[],
  initialPlan: Plan,
  initialBilling: Billing
) => {
  setSelectedPlan(initialPlan.id);
  setupSlider(sliderElem, plans, initialPlan.id);
  setupSwitch(switchElem, initialBilling);
  setupDiscounts(
    [discountMobileElem, discountDesktopElem],
    yearlyDiscountValue
  );
  setupButton(buttonElem);

  modalCloseElem.addEventListener("click", () =>
    modalElem.classList.remove("open")
  );
};

setupApp(plans, selectedPlan, selectedBilling);
