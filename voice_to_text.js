Sentry.init({
  dsn: "https://3a7969f367fc4b1ca5fb52b1bf602ef7@o1293519.ingest.sentry.io/6516131",
  integrations: [new Sentry.BrowserTracing()],
  tracesSampleRate: 1.0,
});

const buttonControl = document.querySelector(".btn.control"); //Encadear classe não pode ter espaço.
const buttonControlText = buttonControl.querySelector("span");
const buttonTelegram = document.querySelector(".btn.telegram");
const buttonWhatsApp = document.querySelector(".btn.whatsapp");
const textarea = document.querySelector(".text");
const language = document.getElementById("language");

const recognition = createRecognition();

let listening = false;

if (recognition) {
  buttonControl.addEventListener("click", () => {
    if (listening) {
      recognition.stop();
    } else {
      recognition.lang = language.value;
      recognition.start();
    }
  });
  textarea.addEventListener("input", (evt) => {
    updateShareButtons(evt.target.value);
  });
} else {
  buttonControl.disabled = true;
  textarea.textContent = "A API SpeechRecognition não está disponível";
}

function createRecognition() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  // Caso a API não exista no browser, paramos o programa
  if (!SpeechRecognition) {
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.onstart = () => {
    listening = true;
    updateButtonText();
  };

  recognition.onend = () => {
    listening = false;
    updateButtonText();
  };

  recognition.onerror = (err) => {
    console.error(err);
    alert("Ops! Aconteceu algo de errado, tente em outro navegador.");
    Sentry.captureException(err);
  };

  recognition.onresult = (evt) => {
    textarea.textContent = evt.results[0][0].transcript;
    activeShareButtons();
    updateShareButtons(textarea.textContent);
  };

  return recognition;
}

function updateButtonText() {
  buttonControlText.textContent = listening
    ? "Parar de escutar"
    : "Aperte para falar";
}

function activeShareButtons() {
  buttonTelegram.classList.remove("disabled");
  buttonWhatsApp.classList.remove("disabled");
}

function updateShareButtons(text) {
  buttonTelegram.href = `https://t.me/share/url?text=${encodeURIComponent(
    text
  )}`;
  buttonWhatsApp.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    text
  )}`;
}

document.getElementById("copy-btn").addEventListener("click", () => {
  document.getElementById("result").select();
  document.execCommand("copy");
});

const themeButton = document.getElementById("checkbox");

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
