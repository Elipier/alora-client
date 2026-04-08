import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import traductorModule from "./traductor.ts";
import correctorModule from "./corrector.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Alora app</h1>
    <h2>Feature 1 : <br>
    Correction --><span class="js-corrected-text"></span><br>
    Traduction --><span class="js-translated-text"></span></h2>
     <form>
        <input type="text" class="js-text-input" id="text-input" placeholder="Traduire phrase..." />
        <button type="submit" class="js-submit-btn">Submit</button>
     </form>
    <div>
      
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

let inputElement: any = document.querySelector(".js-text-input");
let submitBtnElement = document.querySelector(".js-submit-btn");
let translatedTextElement: any = document.querySelector(".js-translated-text");
let correctedTextElement: any = document.querySelector(".js-corrected-text");
let resultTranslation: undefined | string;

if (submitBtnElement !== null && inputElement !== null) {
  submitBtnElement.addEventListener("click", async (event) => {
    event.preventDefault();

    const result = await correctorModule(inputElement.value);

    const matches = result.matches;
    let matchesArray = [];
    let newString: string = inputElement.value;

    if (matches.length > 0) {
      for (let i = 0; i < matches.length; i++) {
        const { offset, length } = matches[i].context;
        const replacement = matches[i].replacements[0].value;

        matchesArray.push({ offset, length, replacement });
      }

      interface MatchInfo {
        offset: number;
        length: number;
        replacement: string;
      }

      const sortedArray = matchesArray.sort((a, b) => b.offset - a.offset);

      sortedArray.forEach((el: MatchInfo) => {
        let reconstructString = `${newString.slice(0, el.offset) + el.replacement + newString.slice(el.offset + el.length)}`;
        newString = reconstructString;
      });

      correctedTextElement.innerHTML = `${newString}`;
      resultTranslation = await traductorModule(newString);
      translatedTextElement.innerHTML = `${resultTranslation}`;
    } else {
      correctedTextElement.innerHTML = `Pas de fautes détectées !`;
      resultTranslation = await traductorModule(inputElement.value);
      translatedTextElement.innerHTML = `${resultTranslation}`;
    }
  });
}
