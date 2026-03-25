import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import traductorModule from "./traductor.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Alora app</h1>
    <h2>Feature 1 : Traduction --><span class="js-text"></span></h2>
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
let textElement: any = document.querySelector(".js-text");

if (submitBtnElement !== null && inputElement !== null) {
  submitBtnElement.addEventListener("click", async (event) => {
    event.preventDefault();
    const result = await traductorModule(inputElement.value);
    textElement.innerHTML = `${result}`;
  });
}
