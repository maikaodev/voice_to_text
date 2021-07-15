const buttonControl = document.querySelector('.btn.control'); //Encadear classe não pode ter espaço.
const buttonTelegram = document.querySelector('.btn.telegram');
const buttonWhatsApp = document.querySelector('.btn.whatsapp');
const textarea = document.querySelector('.text');
const language = document.getElementById('language');


const recognition = createRecognition();

let listening = false;

if (recognition) {
  buttonControl.addEventListener('click', () => {
    if(listening){
      recognition.stop();
    }else{
      recognition.lang = language.value
      recognition.start();
    }
  })
} else {
  buttonControl.disabled = true
  textarea.textContent = 'A API SpeechRecognition não está disponível'
}

function createRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
  // Caso a API não exista no browser, paramos o programa
  if (!SpeechRecognition) {
    return
  }

  const recognition = new SpeechRecognition();

  recognition.onstart = () => {
    listening = true 
    updateButtonText();
  }

  recognition.onend = () => {
    listening = false
    updateButtonText();
  }

  recognition.onerror = err => {
    console.error(err)
  }

  recognition.onresult = evt => {
    console.log(evt)
    textarea.textContent = evt.results[0][0].transcript
    activeShareButtons();
  }

  return recognition
}

function updateButtonText(){
  buttonControl.textContent = listening ? 'Parar de escutar' : 'Aperte para falar'
}

function activeShareButtons(){
  buttonTelegram.classList.remove('disabled')
  buttonWhatsApp.classList.remove('disabled')

  const text = textarea.textContent

  buttonTelegram.href = `https://t.me/share/url?text=${text}`
  buttonWhatsApp.href = `https://api.whatsapp.com/send?text=${text}`
}
