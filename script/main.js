const addInput = document.querySelector(".form-control"); //отслеж. состояние инпута
const addForm = document.querySelector("#taskAdd"); //отслеж. сост. формы
const list = document.querySelector("#listPoints");

addForm.addEventListener("submit", addPoint);

function addPoint(event) {
  console.log(event.target);

  //предотвращение рефреша страницы
  event.preventDefault();

  //считываем содержимое инпута
  const newPoint = addInput.value;

  //генерация разметки для нового пункта меню
  const upContent = `
  <li class="high">
              <span>${newPoint}</span>
              <button class="btn btn-outline-secondary" type="button">Button</button>
              <button class="btn btn-outline-secondary" type="button">Button</button>
            </li>`;

  //добавление разметки в нужное место
  list.insertAdjacentHTML("afterbegin", upContent);

  addInput.value = "";
  addInput.focus();

  //очистка элемента списка по умолчанию
  if (list.children.length > 1) {
    empty.classList.add("none");
  }
}

// console.log(event.target);
//   if (event.target.datasetcd)
