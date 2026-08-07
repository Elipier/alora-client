import { getFromLocalstorage, removeFromLocalstorage } from "./sentenceStorage";
import { initSwiper } from "./swiper";

const spamTracker = getFromLocalstorage("ads-candidate-feedback-hash");
if (spamTracker) {
  removeFromLocalstorage("ads-candidate-feedback-hash");
}

const wrapper = document.querySelector(".swiper-wrapper");

let localStorageArray = Object.values(localStorage);

if (wrapper) {
  wrapper.innerHTML = localStorageArray
    .map((el) => `<div class="swiper-slide">${el}</div>`)
    .join("");
}

initSwiper();
