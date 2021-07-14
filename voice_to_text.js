const button = document.querySelector('.btn');
const textarea = document.querySelector('.text');

const recognition = createRecognition();

let listening = false;

if (recognition) {
  button.addEventListener('click', () =>{
    listening = !listening;
    button.textContent = listening ? 'Parar de escutar' : 'Aperte para falar'
  })

}

function createRecognition() {
  return true
}