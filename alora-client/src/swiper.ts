import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function initSwiper() {
  const swiper = new Swiper(".swiper", {
    modules: [Navigation, Pagination],
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    observer: true,
    observeParents: true,
    centeredSlides: true,
    centerInsufficientSlides: true,
  });

  return swiper;
}

export { initSwiper };
