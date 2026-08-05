import Swiper from "swiper";
import { Navigation, Scrollbar } from "swiper/modules";

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
});

export { swiper };
