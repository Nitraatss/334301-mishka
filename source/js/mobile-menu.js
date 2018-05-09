(function () {
  const TABLET_WIDTH = 768;

  const toggleButton = document.querySelector(`.main-nav__toggle-button`);
  const siteLists = document.querySelectorAll(`.site-list`);

  let flag = 1;

  const showMenu = () => {
    toggleButton.classList.remove(`main-nav__toggle-button--open`);
    toggleButton.classList.add(`main-nav__toggle-button--close`);

    siteLists.forEach((element) => {
      element.classList.remove(`site-list--hidden`);
    })

    flag = 0;
  }

  const hideMenu = () => {
    toggleButton.classList.remove(`main-nav__toggle-button--close`);
    toggleButton.classList.add(`main-nav__toggle-button--open`);

    siteLists.forEach((element) => {
      element.classList.add(`site-list--hidden`);
    })

    flag = 1;
  }

  const onToggleButtonClick = () => {

    if (flag) {
      showMenu();
    } else {
      hideMenu();
    }
  }

  const checkWindowSize = () => {
    if (document.documentElement.clientWidth >= TABLET_WIDTH) {
      toggleButton.classList.remove(`main-nav__toggle-button--close`);
      toggleButton.classList.add(`main-nav__toggle-button--open`);

      siteLists.forEach((element) => {
        element.classList.remove(`site-list--hidden`);
      })

      flag = 1;
    } else if (flag) {
      toggleButton.classList.remove(`main-nav__toggle-button--close`);
      toggleButton.classList.add(`main-nav__toggle-button--open`);

      siteLists.forEach((element) => {
        element.classList.add(`site-list--hidden`);
      })

      flag = 1;
    }
  }

  const onWindowResize = () => {
    checkWindowSize();
  }

  checkWindowSize();

  toggleButton.addEventListener(`click`, onToggleButtonClick);
  window.addEventListener('resize', onWindowResize);
})();
