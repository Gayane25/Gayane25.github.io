const open = document.getElementById('open');
// const body = document.querySelector('body');
const modal_container = document.getElementById('modal-container');
const close = document.getElementById('close');
// const overlay = document.getElementById('overlay');
// open.onclick = function () {
//   modal_container.style.display = 'flex';
//   //   body.style.backgroundColor = 'rgba(0,0,0,0.3)';
// };
// close.onclick = function () {
//   modal_container.style.display = 'none';
//   body.style.backgroundColor = '#edeef6';
// };

open.addEventListener('click', function () {
  modal_container.style.display = 'flex';
});

close.addEventListener('click', function () {
  modal_container.style.display = 'none';
});

// overlay.addEventListener('click', function () {
//   modal_container.style.display = 'none';
// });
