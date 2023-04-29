/* const output = document.querySelector('.output-text'); */
const CaseUp = document.querySelectorAll('.case-up');
const CaseDown = document.querySelectorAll('.case-down');

function UpperCase(event) {
  const isCaps = event.getModifierState('CapsLock');
  if (event.shiftKey || isCaps) {
    for (let i = 0; i < CaseUp.length; i += 1) {
      CaseUp[i].classList.remove('hidden');
      CaseDown[i].classList.add('hidden');
    }
  } else if (!event.shiftKey || !isCaps) {
    for (let i = 0; i < CaseUp.length; i += 1) {
      CaseUp[i].classList.add('hidden');
      CaseDown[i].classList.remove('hidden');
    }
  }
}

document.addEventListener('keydown', (event) => {
  /* console.log(event.code); */
  const button = document.querySelector(`#${event.code}`);
  button.parentNode.parentNode.classList.add('active');
  UpperCase(event);
});

document.addEventListener('keyup', (event) => {
  /* console.log(event.code); */
  console.log(event);
  const button = document.querySelector(`#${event.code}`);
  button.parentNode.parentNode.classList.remove('active');
  UpperCase(event);
});
