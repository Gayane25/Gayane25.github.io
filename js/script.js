const popUpPage = document.getElementById('popUp-page');
let clickMe = document.getElementById('clickMe');
const overlay = document.getElementById('overlay');
let spanClose = document.getElementsByClassName('close')[0];
clickMe.onclick = function () {
  popUpPage.style.display = 'block';
};
spanClose.onclick = function () {
  popUpPage.style.display = 'none';
};

popUpPage.addEventListener('click', function (event) {
  if (event.target == popUpPage) {
    popUpPage.style.display = 'none';
  }
});

// overlay.addEventListener('click', () => {
//   const modals = document.querySelectorAll('popUpPage.active');
//   modals.forEach(popUpPage => {
//     spanClose(popUpPage);
//   });
// });
