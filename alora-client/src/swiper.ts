import Swiper from "swiper";
import { Scrollbar } from "swiper/modules";

import "swiper/css";
import "swiper/css/scrollbar";

function initSwiper() {
  const swiper = new Swiper(".swiper", {
    modules: [Scrollbar],
    scrollbar: {
      el: ".swiper-scrollbar",
    },

    observer: true,
    observeParents: true,
    centeredSlides: true,
    centerInsufficientSlides: true,
  });

  return swiper;
}

export { initSwiper };
