let init = () => {
  let replaceQuotesButton = document.querySelector("#replace-quotes");
  let checkButton = document.querySelector("#check-form");
  let paragraph = document.querySelector(".task-1-2 p");

  let replaceQuotes = /\B'|'\B/g;
  let namePattern = /^[a-zа-яё]+$/i;
  let phonePattern = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/g;
  let emailPattern = /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/g;

  let inputName = document.querySelector("#name");
  let inputPhone = document.querySelector("#phone");
  let inputEmail = document.querySelector("#email");
  let inputArr = [inputName, inputPhone, inputEmail];
  let notice = document.querySelector(".notice");

  function checkCorrect(HTMLElevent, RegExp) {
    if (RegExp.test(HTMLElevent.value)) {
      if (!HTMLElevent.classList.contains("correct")) {
        HTMLElevent.classList.add("correct");
        HTMLElevent.classList.remove("incorrect");
      }
    } else if (!RegExp.test(HTMLElevent.value)) {
      if (!HTMLElevent.classList.contains("incorrect")) {
        HTMLElevent.classList.add("incorrect");
        HTMLElevent.classList.remove("correct");
      }
    }
  }

  // Задание 1 и 2
  replaceQuotesButton.addEventListener("click", () => (paragraph.innerHTML = paragraph.textContent.replace(replaceQuotes, '"')));

  //Задание 3
  checkButton.addEventListener("click", () => {
    checkCorrect(inputName, namePattern);
    checkCorrect(inputPhone, phonePattern);
    checkCorrect(inputEmail, emailPattern);

    for (const elem of inputArr) {
      if (elem.classList.contains("incorrect")) {
        notice.style.display = "block";
        break;
      } else notice.style.display = "none";
    }
  });
};

window.onload = init;
