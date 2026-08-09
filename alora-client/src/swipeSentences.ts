import { getFromLocalstorage, removeFromLocalstorage } from "./sentenceStorage";
import { readSentence } from "./speechRecognition";
import { initSwiper } from "./swiper";

const spamTracker = getFromLocalstorage("ads-candidate-feedback-hash");
if (spamTracker) {
  removeFromLocalstorage("ads-candidate-feedback-hash");
}

const wrapper = document.querySelector<HTMLElement>(".swiper-wrapper");
let swiper = null as ReturnType<typeof initSwiper> | null;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderSentences() {
  if (!wrapper) return;

  const sentenceEntries = Object.entries(localStorage)
    .filter(([key]) => /^\d+$/.test(key))
    .map(([, value]) => value)
    .filter(Boolean);

  if (sentenceEntries.length === 0) {
    wrapper.innerHTML = `
      <div class="swiper-slide">
        <div class="swipe-card empty-state">
          <p class="swipe-card-label">Aucune phrase enregistrée</p>
          <p class="swipe-card-text">Ajoutez une phrase dans l’outil de traduction pour la voir apparaître ici.</p>
        </div>
      </div>
    `;
    if (swiper) {
      swiper.update();
    }
    return;
  }

  wrapper.innerHTML = sentenceEntries
    .map(
      (sentence) => `
        <div class="swiper-slide">
          <div class="swipe-card">
            <p class="swipe-card-label">Phrase à réviser</p>
            <p class="swipe-card-text">${escapeHtml(sentence)}</p>
            <button type="button" class="swipe-card-button" data-sentence="${escapeHtml(sentence)}">
              Prononcer
            </button>
          </div>
        </div>
      `,
    )
    .join("");

  wrapper
    .querySelectorAll<HTMLButtonElement>("[data-sentence]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        readSentence(button.dataset.sentence ?? "");
      });
    });

  if (swiper) {
    swiper.update();
  }
}

window.addEventListener("sentences:updated", renderSentences);
renderSentences();
swiper = initSwiper();
