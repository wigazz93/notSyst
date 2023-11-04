update();
document
  .querySelector(".not__form button")
  .addEventListener("click", function () {
    let time = document.querySelector(".not__form input").value;
    let msg = document.querySelector(".not__form textarea").value;
    let info = document.querySelector(".not__info");

    if (!time || !msg) {
      info.textContent = "Укажите время и сообщение";
      info.style.opacity = 1;
      setTimeout(() => {
        info.style.opacity = 0;
      }, 2000);
      setTimeout(() => {
        info.textContent = "";
      }, 3000);
      return;
    }
    localStorage.setItem(time, msg);
    update();
  });
document
  .querySelector(".not__list > button")
  .addEventListener("click", function () {
    if (localStorage.length && confirm("Очистить список уведомлений?")) {
      localStorage.clear();
      document.querySelector(".not__list").hidden = true;
    } else if (!localStorage.length) {
      alert("Уведомлений нет");
    }
  });

function update() {
  if (!localStorage.length) {
    document.querySelector(".not__list").hidden = true;
  } else {
    document.querySelector(".not__list").hidden = false;
  }
  document.querySelector(".not__list > div").innerHTML = "";
  document.querySelector(".not__info").textContent = "";

  for (let key of Object.keys(localStorage)) {
    document.querySelector(".not__list > div").insertAdjacentHTML(
      "beforeend",
      `<div class="not__item"> 
      <div>${key} - ${localStorage.getItem(key)}</div>
      <button data-time="${key}"> &times; </button>
      </div>`
    );
  }
  document.querySelector(".not__form input").value = "";
  document.querySelector(".not__form textarea").value = "";
}
document.querySelector(".not__list").addEventListener("click", function (e) {
  if (!e.target.dataset.time) return;
  localStorage.removeItem(e.target.dataset.time);
  update();
});
setInterval(() => {
  let curDate = new Date();
  let curHour = curDate.getHours();
  if (curHour < 10) {
    curHour = "0" + curHour;
  }
  let curMin = curDate.getMinutes();
  if (curMin < 10) {
    curMin = "0" + curMin;
  }
  let curTime = `${curHour}:${curMin}`;

  for (let key of Object.keys(localStorage)) {
    let keyHour = key.split(":")[0];
    let keyMin = key.split(":")[1];
    if (key == curTime || (keyHour == curHour && keyMin < curMin)) {
      document
        .querySelector(`button[data-time="${key}"]`)
        .closest(".not__item")
        .classList.add("not__warning");
    }
  }
}, 2000);
