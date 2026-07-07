export function readSentence(sentence: string) {
  const synth = window.speechSynthesis;
  if (!("speechSynthesis" in window)) {
    console.warn("SpeechSynthesis not supported by this browser.");
    return;
  }

  const utterance = new SpeechSynthesisUtterance(sentence);
  utterance.lang = "es-MX";
  console.log(utterance.lang);

  // Stop any current speech and speak the new sentence
  synth.cancel();
  synth.speak(utterance);
}
