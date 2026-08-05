import { getFromLocalstorage, removeFromLocalstorage } from "./sentenceStorage";

const sentenceDisplay = document.querySelector<HTMLElement>(".js-text-show");
const previousButton = document.querySelector<HTMLElement>(".js-previous");
const nextButton = document.querySelector<HTMLElement>(".js-next");
let currentIndex = 0;

const spamTracker = getFromLocalstorage("ads-candidate-feedback-hash");
if (spamTracker) {
  removeFromLocalstorage("ads-candidate-feedback-hash");
}

let localStorageArray = Object.values(localStorage);
let arrayLength: any;

if (sentenceDisplay && previousButton && nextButton) {
  localStorageArray = Object.values(localStorage);
  arrayLength = localStorageArray.length;
  sentenceDisplay.textContent = `${localStorageArray[currentIndex]}`;
  previousButton.addEventListener("click", () => {
    const prevIndex = (currentIndex + arrayLength - 1) % arrayLength;
    const prevItem = localStorageArray[prevIndex];
    sentenceDisplay.textContent = `${prevItem}`;
    currentIndex = prevIndex;
    console.log(currentIndex);
  });

  nextButton.addEventListener("click", () => {
    localStorageArray = Object.values(localStorage);
    arrayLength = localStorageArray.length;
    const nextIndex = (currentIndex + 1) % arrayLength;
    const nextItem = localStorageArray[nextIndex];
    sentenceDisplay.textContent = `${nextItem}`;
    currentIndex = nextIndex;
    console.log(currentIndex);
  });
}
