const button = document.querySelector('.btn');
const textarea = document.querySelector('.text');

const recognition = createRecognition();

let listening = false;

if (recognition) {
  button.addEventListener('click', () => {
    listening ? recognition.stop() : recognition.start()
    button.textContent = listening ? 'Parar de escutar' : 'Aperte para falar'
  })
} else {
  button.disabled = true
  // TODO: Melhorar mensagem para leigos
  textarea.textContent = 'A API SpeechRecognition não está disponível'
}

function createRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
  // Caso a API não exista no browser, paramos o programa
  if (!SpeechRecognition) {
    return
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "pt_BR"

  recognition.onstart = () => {
    listening = true 
  }

  recognition.onend = () => {
    listening = false
  }

  recognition.onerror = err => {
    console.error(err)
  }

  recognition.onresult = evt => {
    console.log(evt)
    textarea.textContent = evt.results[0][0].transcript
  }

  return recognition
}
