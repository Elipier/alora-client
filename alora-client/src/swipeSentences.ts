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
const arrayLength = localStorageArray.length;

console.log(localStorageArray);

if (sentenceDisplay && previousButton && nextButton) {
  sentenceDisplay.textContent = `${localStorageArray[currentIndex]}`;
  previousButton.addEventListener("click", () => {
    let prevIndex = (currentIndex + arrayLength - 1) % arrayLength;
    let prevItem = localStorageArray[prevIndex];
    sentenceDisplay.textContent = `${prevItem}`;
    currentIndex = prevIndex;
    console.log(currentIndex);
  });

  nextButton.addEventListener("click", () => {
    let nextIndex = (currentIndex + 1) % arrayLength;
    let nextItem = localStorageArray[nextIndex];
    sentenceDisplay.textContent = `${nextItem}`;
    currentIndex = nextIndex;
    console.log(currentIndex);
  });
}
