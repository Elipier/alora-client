import "@picocss/pico/css/pico.min.css";
import "./style.css";
import traductorModule from "./traductor";
import correctorModule from "./corrector";
import type { LanguageToolMatch, MatchInfo } from "./types";
import {
  addToLocalStorage,
  getFromLocalstorage,
  deleteFromLocalStorage,
  removeFromLocalstorage,
  logStorage,
} from "./sentenceStorage";
import { readSentence } from "./speechRecognition";

const inputElement = document.querySelector<HTMLInputElement>(".js-text-input");
const submitBtnElement =
  document.querySelector<HTMLButtonElement>(".js-submit-btn");
const translatedTextElement = document.querySelector<HTMLSpanElement>(
  ".js-translated-text",
);
const correctedTextElement =
  document.querySelector<HTMLSpanElement>(".js-corrected-text");
const triggerRandomSentence =
  document.querySelector<HTMLButtonElement>(".js-retrieve");
const deleteAllSentences =
  document.querySelector<HTMLButtonElement>(".js-clear");
const randomSentenceElement = document.querySelector<HTMLSpanElement>(
  ".js-random-sentence",
);
const logStorageElement =
  document.querySelector<HTMLSpanElement>(".js-log-storage");
const readSentenceElement = document.querySelector<HTMLSpanElement>(".js-read");
if (
  submitBtnElement &&
  inputElement &&
  translatedTextElement &&
  correctedTextElement &&
  triggerRandomSentence &&
  deleteAllSentences &&
  randomSentenceElement &&
  readSentenceElement &&
  logStorageElement
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

      translatedTextElement.textContent = translation;
    } catch (error) {
      correctedTextElement.textContent = "Erreur lors du traitement.";
      translatedTextElement.textContent = "";
      console.error(error);
    }
  });

  triggerRandomSentence.addEventListener("click", () => {
    const spamTracker = getFromLocalstorage("ads-candidate-feedback-hash");
    if (spamTracker) {
      removeFromLocalstorage("ads-candidate-feedback-hash");
    }

    const sentencesLenght = localStorage.length;

    const getRandomNunmber = Math.floor(
      Math.random() * sentencesLenght + 1,
    ).toString();

    const randomSentence = getFromLocalstorage(getRandomNunmber);

    if (randomSentence) {
      randomSentenceElement.textContent = `${randomSentence}`;
    }
  });

  //TODO : J'arrive pas à loguer
  logStorageElement.addEventListener("click", () => {
    const spamTracker = getFromLocalstorage("ads-candidate-feedback-hash");
    if (spamTracker) {
      removeFromLocalstorage("ads-candidate-feedback-hash");
    }

    logStorage();
    console.log(localStorage);
  });

  deleteAllSentences.addEventListener("click", () => {
    deleteFromLocalStorage();
  });

  readSentenceElement?.addEventListener("click", () => {
    if (!randomSentenceElement.textContent) return;
    readSentence(randomSentenceElement.textContent);
  });
}
