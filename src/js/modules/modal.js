const modal = document.querySelector(".backdrop");
const modalBtnOpen = document.querySelector(".modal-btn-open");
const modalBtnClose = document.querySelector(".modal-btn-close");
const form = document.querySelector("form");

let errorMessage = document.querySelector(".form__error-message");
if (!errorMessage) {
  errorMessage = document.createElement("div");
  errorMessage.classList.add("form__error-message");
  form.appendChild(errorMessage);
}

const toggleModal = () => modal.classList.toggle("is-hidden");

modalBtnOpen.addEventListener("click", (e) => {
  e.preventDefault();

  const requiredFields = form.querySelectorAll("[required]");
  let allFilled = true;

  requiredFields.forEach((field) => {
    if (!field.value.trim()) {
      allFilled = false;
      field.classList.add("input-error");
    } else {
      field.classList.remove("input-error");
    }
  });

  if (allFilled) {
    errorMessage.textContent = "";
    errorMessage.style.opacity = "0";
    errorMessage.style.display = "none";
    toggleModal();
  } else {
    errorMessage.textContent = "Будь ласка, заповніть усі обов’язкові поля.";
    errorMessage.style.opacity = "1";
    errorMessage.style.display = "block";
    setTimeout(() => {
      errorMessage.style.opacity = "0";
      setTimeout(() => {
        errorMessage.style.display = "none";
      }, 300);
    }, 3000);
  }
});

modalBtnClose.addEventListener("click", toggleModal);
