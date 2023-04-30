const Output = document.querySelector('.output-text');
const CaseUp = document.querySelectorAll('.case-up');
const CaseDown = document.querySelectorAll('.case-down');
const CapsLock = document.querySelectorAll('.caps-lock');
const RuKeyboard = document.querySelectorAll('.ru');
const EngKeyboard = document.querySelectorAll('.eng');

function ShiftKey(event) {
  if (event.shiftKey) {
    for (let i = 0; i < CaseUp.length; i += 1) {
      CaseUp[i].classList.remove('hidden');
      CaseDown[i].classList.add('hidden');
      CapsLock[i].classList.add('hidden');
    }
  } else if (!event.shiftKey) {
    for (let i = 0; i < CaseUp.length; i += 1) {
      CaseUp[i].classList.add('hidden');
      CaseDown[i].classList.remove('hidden');
    }
  }
}

function CapsKey(event) {
  const isCaps = event.getModifierState('CapsLock');
  if (isCaps && event.code === 'CapsLock') {
    for (let i = 0; i < CaseUp.length; i += 1) {
      CapsLock[i].classList.remove('hidden');
      CaseDown[i].classList.add('hidden');
    }
  } else if (!isCaps && event.code === 'CapsLock') {
    for (let i = 0; i < CaseUp.length; i += 1) {
      CapsLock[i].classList.add('hidden');
      CaseDown[i].classList.remove('hidden');
    }
  }
}

function SelectLanguage(event) {
  if (event.ctrlKey && event.code === 'MetaLeft') {
    if (!RuKeyboard[0].classList.contains('hidden')) {
      for (let i = 0; i < RuKeyboard.length; i += 1) {
        RuKeyboard[i].classList.add(('hidden'));
        EngKeyboard[i].classList.remove(('hidden'));
      }
    } else {
      for (let i = 0; i < RuKeyboard.length; i += 1) {
        RuKeyboard[i].classList.remove(('hidden'));
        EngKeyboard[i].classList.add(('hidden'));
      }
    }
  }
}

document.addEventListener('keydown', (event) => {
  /* console.log(event);
  console.log(event.code); */
  const button = document.querySelector(`#${event.code}`);
  button.parentNode.parentNode.classList.add('active');
  ShiftKey(event);
  SelectLanguage(event);
  CapsKey(event);
});

document.addEventListener('keyup', (event) => {
  /* console.log(event.code); */
  /* console.log(event); */
  const button = document.querySelector(`#${event.code}`);
  button.parentNode.parentNode.classList.remove('active');
  ShiftKey(event);
  CapsKey(event);
});
