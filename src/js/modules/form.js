document.addEventListener("DOMContentLoaded", () => {
  const customSelects = document.querySelectorAll(".form__custom-select");

  customSelects.forEach((select) => {
    const trigger = select.querySelector(".form__custom-select-trigger");
    const options = select.querySelectorAll(".form__custom-option");
    const hiddenInput = select.parentElement.querySelector(
      'input[type="hidden"]'
    );

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      select.classList.toggle("open");
    });

    options.forEach((option) => {
      option.addEventListener("click", () => {
        trigger.textContent = option.textContent;
        hiddenInput.value = option.dataset.value;
        select.classList.remove("open");
      });
    });

    document.addEventListener("click", (e) => {
      if (!select.contains(e.target)) {
        select.classList.remove("open");
      }
    });
  });
});


