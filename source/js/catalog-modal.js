(function () {
  const ESC_CODE = 27;

  const addToBasketButtons = document.querySelectorAll(`.product__add-to-basket-btn`);
  const overlay = document.querySelector(`.overlay`);
  const modalAddToBasket = document.querySelector(`.modal-add-to-basket`);

  const onEscPress = (evt) => {
    if (evt.keyCode === ESC_CODE) {
      overlay.classList.add(`overlay--hidden`);
      modalAddToBasket.classList.add(`modal-add-to-basket--hidden`);
      document.removeEventListener(`keyDown`, onEscPress);
    }
  }

  const onAddToBasketButtonClick = (evt) => {
    evt.preventDefault();

    overlay.classList.remove(`overlay--hidden`);
    modalAddToBasket.classList.remove(`modal-add-to-basket--hidden`);

    document.addEventListener(`keydown`, onEscPress);
  };

  addToBasketButtons.forEach((button) => {
    button.addEventListener(`click`, onAddToBasketButtonClick);
  })
})();
