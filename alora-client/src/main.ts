import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import traductorModule from "./traductor";
import correctorModule from "./corrector";
import type { LanguageToolMatch, MatchInfo } from "./types";
import {
  addToLocalStorage,
  getFromLocalstorage,
  deleteFromLocalStorage,
  removeFromLocalstorage,
} from "./sentenceStorage";

const appElement = document.querySelector<HTMLDivElement>("#app");

if (!appElement) {
  throw new Error("Impossible de trouver l'élément #app");
}

appElement.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Alora app</h1>
    <h2>Feature 1 : </h2>
    <h3>Correction --><span class="js-corrected-text"></span><br>
    Traduction --><span class="js-translated-text"></span><br>
    Phrase Random --><span class="js-random-sentence"></span>
    </h3>
    
     <form>
        <input type="text" class="js-text-input" id="text-input" placeholder="Traduire phrase..." />
        <button type="submit" class="js-submit-btn">Submit</button>
     </form>

     <button class="js-retrieve">Get random sentence</button>
     <button class="js-clear">Delete all sentences</button>
    <div>
      
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

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
if (
  submitBtnElement &&
  inputElement &&
  translatedTextElement &&
  correctedTextElement &&
  triggerRandomSentence &&
  deleteAllSentences &&
  randomSentenceElement
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

    let sentencesLenght = localStorage.length;

    const getRandomNunmber = Math.floor(
      Math.random() * sentencesLenght + 1,
    ).toString();

    const randomSentence = getFromLocalstorage(getRandomNunmber);

    if (randomSentence) {
      randomSentenceElement.textContent = `${randomSentence}`;
    }
    console.log(localStorage);
  });

  deleteAllSentences.addEventListener("click", () => {
    deleteFromLocalStorage();
    console.log(localStorage);
  });
}
