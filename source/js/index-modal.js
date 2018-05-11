(function () {
  const ESC_CODE = 27;

  const weekOfferButton = document.querySelector(`.week-offer__button`);
  const overlay = document.querySelector(`.overlay`);
  const modalAddToBasket = document.querySelector(`.modal-add-to-basket`);

  const onEscPress = (evt) => {
    if (evt.keyCode === ESC_CODE) {
      overlay.classList.add(`overlay--hidden`);
      modalAddToBasket.classList.add(`modal-add-to-basket--hidden`);
      document.removeEventListener(`keyDown`, onEscPress);
    }
  }

  const onWeekOfferButtonClick = (evt) => {
    evt.preventDefault();

    overlay.classList.remove(`overlay--hidden`);
    modalAddToBasket.classList.remove(`modal-add-to-basket--hidden`);

    document.addEventListener(`keydown`, onEscPress);
  };

  weekOfferButton.addEventListener(`click`, onWeekOfferButtonClick);
})();
