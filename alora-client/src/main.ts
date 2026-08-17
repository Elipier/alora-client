import "@picocss/pico/css/pico.min.css";
import "./style.css";
import traductorModule from "./traductor";
import correctorModule from "./corrector";
import type { LanguageToolMatch, MatchInfo } from "./types";
import { addToLocalStorage, deleteFromLocalStorage } from "./sentenceStorage";

const inputElement = document.querySelector<HTMLInputElement>(".js-text-input");
const submitBtnElement =
  document.querySelector<HTMLButtonElement>(".js-submit-btn");
const translatedTextElement = document.querySelector<HTMLSpanElement>(
  ".js-translated-text",
);
const correctedTextElement =
  document.querySelector<HTMLSpanElement>(".js-corrected-text");
const deleteAllSentences =
  document.querySelector<HTMLButtonElement>(".js-clear");

const tabButtons =
  document.querySelectorAll<HTMLButtonElement>("[data-tab-target]");
const tabPanels = document.querySelectorAll<HTMLElement>("[data-tab-panel]");

if (
  submitBtnElement &&
  inputElement &&
  translatedTextElement &&
  correctedTextElement
) {
  submitBtnElement.addEventListener("click", async (event) => {
    event.preventDefault();

    if (!inputElement.value) return;

    try {
      const result = await correctorModule(inputElement.value);
      const matches = result.matches ?? [];
      let correctedText = inputElement.value;

      if (matches.length > 0) {
        const corrections: MatchInfo[] = matches.map(
          (match: LanguageToolMatch) => ({
            offset: match.context.offset,
            length: match.context.length,
            replacement: match.replacements[0]?.value ?? "",
          }),
        );

        corrections.sort((a, b) => b.offset - a.offset);

        correctedText = corrections.reduce((current, correction) => {
          return (
            current.slice(0, correction.offset) +
            correction.replacement +
            current.slice(correction.offset + correction.length)
          );
        }, correctedText);

        correctedTextElement.textContent = correctedText;
      } else {
        correctedTextElement.textContent = "Pas de fautes détectées !";
      }

      const textToTranslate =
        matches.length > 0 ? correctedText : inputElement.value;
      const translation = await traductorModule(textToTranslate);

      addToLocalStorage(translation);
      window.dispatchEvent(new CustomEvent("sentences:updated"));

      translatedTextElement.textContent = translation;
    } catch (error) {
      correctedTextElement.textContent = "Erreur lors du traitement.";
      translatedTextElement.textContent = "";
      console.error(error);
    }
  });
}

if (deleteAllSentences) {
  deleteAllSentences.addEventListener("click", () => {
    deleteFromLocalStorage();
    window.dispatchEvent(new CustomEvent("sentences:updated"));
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tabTarget;
    if (!target) return;

    tabButtons.forEach((tabButton) => {
      const isActive = tabButton === button;
      tabButton.classList.toggle("is-active", isActive);
      tabButton.setAttribute("aria-selected", String(isActive));
      tabButton.tabIndex = isActive ? 0 : -1;
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.dataset.tabPanel === target;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });
  });
});
