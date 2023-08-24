// Управление бургер меню
module.exports = function btnToggle() {
  const bodyRef = document.body;
  const menuIconRef = document.querySelector("#menu-icon"); // Элементы гамбургер меню
  const menuRef = document.querySelector("#menu"); // Навигация
  const navListRef = document.querySelector(".nav__list");
  // console.log(navListRef);

  window.addEventListener("click", (event) => {
    if (event.target.closest("#nav__btn-toggle")) {
      menuIconRef.classList.toggle("js-menu-icon-active");
      menuRef.classList.toggle("active");
      bodyRef.classList.toggle("no-scroll");

      if (menuRef.classList.contains("active")) {
        // bodyRef.style.paddingRight = "17px";
      } else {
        // bodyRef.style.paddingRight = "0px";
      }
    }

    if (!event.target.closest(".header__content")) {
      return;
    }

    if ((event.target.matches("a") && event.target.closest(".nav__list")) || event.target.classList.contains("nav__list")) {
      menuIconRef.classList.remove("js-menu-icon-active");
      menuRef.classList.remove("active");
      bodyRef.classList.remove("no-scroll");
      navListRef.classList.remove("menu-nav-open");
      navListRef.classList.add("menu-nav-close");
      // bodyRef.style.paddingRight = "0px";
    }
  });
};
// btnToggle();
