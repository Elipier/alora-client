import Swiper from "swiper";
import { Pagination, EffectCards } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function initSwiper() {
  const swiper = new Swiper(".swiper", {
    modules: [Pagination, EffectCards],
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },

    cardsEffect: {
      perSlideOffset: 7,
    },

    effect: "cards",
    observer: true,
    observeParents: true,
    centeredSlides: true,
    centerInsufficientSlides: true,
  });

  return swiper;
}

export { initSwiper };
