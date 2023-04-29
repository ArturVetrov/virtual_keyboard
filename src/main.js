/* const output = document.querySelector('.output-text'); */

document.addEventListener('keydown', (event) => {
  console.log(event.key);

  const button = document.querySelector(`#${event.key}`);
  button.parentNode.parentNode.classList.add('active');
});

document.addEventListener('keyup', (event) => {
  console.log(event.key);

  const button = document.querySelector(`#${event.key}`);
  button.parentNode.parentNode.classList.remove('active');
});
