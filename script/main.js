const addInput = document.querySelector(".form-control"); //отслеж. состояние инпута
const addForm = document.querySelector("#taskAdd"); //отслеж. сост. формы
const list = document.querySelector("#listPoints");

let points = [];

if (localStorage.getItem("points")) {
  points = JSON.parse(localStorage.getItem("points"));
  points.forEach((point) => newPointComponent(point));
}

listIsEmpty();

addForm.addEventListener("submit", addPoint);

function addPoint(event) {
  //предотвращение рефреша страницы
  event.preventDefault();

  //считываем содержимое инпута
  const newPoint = addInput.value;

  const added = {
    id: Date.now(),
    text: newPoint,
    read: false,
  };

  points.push(added);

  saveData();

  newPointComponent(added);

  addInput.value = "";
  addInput.focus();

  listIsEmpty();
}

// удаление пунктов

list.addEventListener("click", deletePoint);

function deletePoint(event) {
  if (event.target.dataset.action === "delete") {
    const parent = event.target.closest("li");

    const id = Number(parent.id);

    const indexId = points.findIndex((point) => {
      return point.id === id;
    });

    points.splice(indexId, 1);

    saveData();

    parent.remove();
  }

  listIsEmpty();
}

//Отметка прочитанности
list.addEventListener("click", doneReading);

function doneReading(event) {
  if (event.target.dataset.action === "done") {
    const parent = event.target.closest("li");

    const id = +parent.id;
    const point = points.find((point) => {
      if (point.id === id) {
        return true;
      }
    });

    point.read = !point.read;

    saveData();

    const pointText = parent.querySelector("span");
    pointText.classList.toggle("read");
  }
}

function listIsEmpty() {
  if (points.length === 0) {
    const emptyListElement = `<li id="empty" class="high">
              <span><i>List is empty</i></span>
            </li>`;
    list.insertAdjacentHTML("beforebegin", emptyListElement);
  }

  if (points.length > 0) {
    const emptyListEl = document.querySelector("#empty");
    emptyListEl ? emptyListEl.remove() : null;
  }
}

function saveData() {
  localStorage.setItem("points", JSON.stringify(points));
}

function newPointComponent(point) {
  const adiitionalCSS = point.read ? "read" : "";

  //генерация разметки для нового пункта меню
  const upContent = `
  <li id="${point.id}" class="high">
              <span class="${adiitionalCSS}" >${point.text}</span>
              <button data-action="done" class="btn btn-outline-secondary done" type="button">Complite</button>
              <button data-action="delete" class="btn btn-outline-secondary delete" type="button">Delete</button>
            </li>`;

  //добавление разметки в нужное место
  list.insertAdjacentHTML("afterbegin", upContent);
}
