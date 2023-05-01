import Keyboard from './keyboard.js';

const Body = document.getElementsByTagName('body');
Body[0].innerHTML += Keyboard;


const CaseUp = document.querySelectorAll('.case-up');
const CaseDown = document.querySelectorAll('.case-down');
const CapsLock = document.querySelectorAll('.caps-lock');
const RuKeyboard = document.querySelectorAll('.ru');
const EngKeyboard = document.querySelectorAll('.eng');

const SetLanguage = window.localStorage.getItem('language');

function InnerText(event, button) {
  let Output = document.querySelector('.output-text');
  const arr = ['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'ShiftLeft', 'ShiftRight', 'fn-button', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'MetaLeft', 'MetaRight'];
  for (let i = 0; i < arr.length; i += 1) {
    if (event.key === arr[i] || event === arr[i]) {
      return;
    }
  }
  if (event.code === 'Space' || event === 'Space') {
    Output.innerHTML += ' ';
    return;
  }
  if (event.code === 'Enter' || event === 'Enter') {
    Output.innerHTML += '<br>';
    return;
  }
  if (event.code === 'Tab' || event === 'Tab') {
    Output.innerHTML += '    ';
    return;
  }
  if (event.code === 'Backspace' || event === 'Backspace') {
    Output.innerHTML = Output.innerHTML.slice(0, -1);
    return;
  }
  const ActiveSpan = button.parentNode.parentNode.getElementsByTagName('span');
  const IndexArray = [];
  for (let i = 0; i < ActiveSpan.length; i += 1) {
    IndexArray.push(!ActiveSpan[i].classList.contains('hidden'));
  }
  if (!ActiveSpan[0].classList.contains('hidden')) {
    const Index = IndexArray.indexOf(true, 1);
    Output.innerHTML += ActiveSpan[Index].innerHTML;
  } else if (ActiveSpan[0].classList.contains('hidden')) {
    const Index = IndexArray.indexOf(true, 5);
    Output.innerHTML += ActiveSpan[Index].innerHTML;
  }
}

function ShiftKey(event) {
  if (event.shiftKey || event === 'down') {
    for (let i = 0; i < CaseUp.length; i += 1) {
      CaseUp[i].classList.remove('hidden');
      CaseDown[i].classList.add('hidden');
      CapsLock[i].classList.add('hidden');
    }
  } else if (!event.shiftKey && event.key === 'Shift' || event === 'up') {
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
  if ((event.ctrlKey && event.code === 'MetaLeft') || event === 'Eng') {
    if (!RuKeyboard[0].classList.contains('hidden')) {
      for (let i = 0; i < RuKeyboard.length; i += 1) {
        RuKeyboard[i].classList.add(('hidden'));
        EngKeyboard[i].classList.remove(('hidden'));
        window.localStorage.setItem('language', 'Eng');
      }
    } else {
      for (let i = 0; i < RuKeyboard.length; i += 1) {
        RuKeyboard[i].classList.remove(('hidden'));
        EngKeyboard[i].classList.add(('hidden'));
        window.localStorage.setItem('language', 'Ru');
      }
    }
  }
}

if (SetLanguage) {
  SelectLanguage(SetLanguage);
}

document.addEventListener('keydown', (event) => {
  if (event.code === 'Tab') {
    event.preventDefault();
  }
  const button = document.querySelector(`#${event.code}`);
  button.parentNode.parentNode.classList.add('active');
  ShiftKey(event);
  SelectLanguage(event);
  CapsKey(event);
  InnerText(event, button);
});

document.addEventListener('keyup', (event) => {
  const button = document.querySelector(`#${event.code}`);
  button.parentNode.parentNode.classList.remove('active');
  ShiftKey(event);
  CapsKey(event);
});

const btns = document.querySelectorAll('.button-keyboard');
btns.forEach((btn) => {
  btn.addEventListener('mousedown', (e) => {
    InnerText(e.target.id, e.target);
    if(e.target.id === 'ShiftLeft' || e.target.id === 'ShiftRight') {
      ShiftKey('down');
    }
    if(e.target.id === 'CapsLock') {
      for (let i = 0; i < CaseUp.length; i += 1) {
        CapsLock[i].classList.toggle('hidden');
        CaseDown[i].classList.toggle('hidden');
      }
    }
  });
  btn.addEventListener('mouseup', (e) => {
    if(e.target.id === 'ShiftLeft' || e.target.id === 'ShiftRight') {
      ShiftKey('up');
    }
  });
});
