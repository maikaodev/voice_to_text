const button = document.querySelector('.btn');
const textarea = document.querySelector('.text');

const recognition = createRecognition();

let listening = false;

if (recognition) {
  button.addEventListener('click', () =>{
    listening = !listening;
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

  return true
}