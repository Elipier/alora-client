let localKeyIncrement = 1;
export function addToLocalStorage(translation: string) {
  localStorage.setItem(`${localKeyIncrement}`, `${translation}`);
  localKeyIncrement++;
}
export function getFromLocalstorage(key: string) {
  return localStorage.getItem(key);
}

export function deleteFromLocalStorage() {
  localStorage.clear();
}

export function removeFromLocalstorage(key: string) {
  return localStorage.removeItem(key);
}

export function logStorage() {
  return console.log(localStorage);
}
