const textArea = document.getElementById("text");
const voiceSelect = document.getElementById("voices");
const rateSlider = document.getElementById("rate");
const pitchSlider = document.getElementById("pitch");
const speakBtn = document.getElementById("speakBtn");
const stopBtn = document.getElementById("stopBtn");
const rateValue = document.getElementById("rateValue");
const pitchValue = document.getElementById("pitchValue");

const synth = window.speechSynthesis;
let voices = [];
let utterance = new SpeechSynthesisUtterance();

function populateVoices() {
  voices = synth.getVoices();
  voiceSelect.innerHTML = "";

  voices.forEach((voice, index) => {
    const option = document.createElement("option");
    option.textContent = `${voice.name} (${voice.lang})`;
    option.value = index;
    voiceSelect.appendChild(option);
  });
}

function speakText() {
  if (synth.speaking) synth.cancel();
  const text = textArea.value.trim();
  if (text === "") return;

  utterance = new SpeechSynthesisUtterance(text);
  const selectedVoice = voices[voiceSelect.value];
  utterance.voice = selectedVoice;
  utterance.rate = parseFloat(rateSlider.value);
  utterance.pitch = parseFloat(pitchSlider.value);
  synth.speak(utterance);
}

function stopSpeech() {
  if (synth.speaking) synth.cancel();
}

rateSlider.oninput = () => {
  rateValue.textContent = rateSlider.value;
};
pitchSlider.oninput = () => {
  pitchValue.textContent = pitchSlider.value;
};

speakBtn.addEventListener("click", speakText);
stopBtn.addEventListener("click", stopSpeech);
voiceSelect.addEventListener("change", () => {
  if (synth.speaking) speakText();
});

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoices;
}

populateVoices();
