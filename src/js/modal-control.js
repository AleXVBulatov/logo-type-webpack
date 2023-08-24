// Управление модальным окном
function modalOpen() {
  const bodyRef = document.body;
  const modalWindowRef = document.querySelector("#modal");
  const menuIconRef = document.querySelector("#menu-icon");
  const menuRef = document.querySelector("#menu");

  window.addEventListener("click", (event) => {
    if (menuRef.classList.contains("active")) return;
    if (
      event.target.dataset.src === "#modal" ||
      event.target.closest("#model__btn-close") ||
      event.target.getAttribute("id") === "modal"
    ) {
      modalWindowRef.classList.toggle("none");
      bodyRef.classList.toggle("no-scroll");
      // bodyRef.style.paddingRight = "17px";
    }

    if (modalWindowRef.classList.contains("none") && !menuIconRef.classList.contains("js-menu-icon-active")) {
      // bodyRef.style.paddingRight = "0px";
    }
  });

  window.addEventListener("keydown", (event) => {
    if (!modalWindowRef.classList.contains("none") && event.key === "Escape") {
      modalWindowRef.classList.add("none");
      bodyRef.classList.remove("no-scroll");
      // bodyRef.style.paddingRight = "0px";
    }
  });
}
modalOpen();
