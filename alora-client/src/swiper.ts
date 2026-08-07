import Swiper from "swiper";
import { Navigation, Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

function initSwiper() {
  let swiper = new Swiper(".swiper", {
    modules: [Navigation, Scrollbar],
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // And if we need scrollbar
    scrollbar: {
      el: ".swiper-scrollbar",
    },

    observer: true,
    observeParents: true,
  });

  return swiper;
}

export { initSwiper };
