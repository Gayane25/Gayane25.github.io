const open = document.getElementById('open');
const body = document.querySelector('body');
const modal_container = document.getElementById('modal-container');
const close = document.getElementById('close');

open.onclick = function () {
  modal_container.style.display = 'flex';
  body.style.backgroundColor = 'rgba(0,0,0,0.3)';
};
close.onclick = function () {
  modal_container.style.display = 'none';
  body.style.backgroundColor = '#edeef6';
};
