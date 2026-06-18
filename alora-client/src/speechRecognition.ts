export function readSentence(sentence: string) {
  if (!("speechSynthesis" in window)) {
    console.warn("SpeechSynthesis not supported by this browser.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(sentence);
  utterance.lang = "fr-CA";

  // Stop any current speech and speak the new sentence
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}
