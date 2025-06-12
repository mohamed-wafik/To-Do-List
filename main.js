const input = document.querySelector(".message");
const inputDiv = document.querySelector(".input-div");
inputDiv.addEventListener("click", (e) => {
  e.preventDefault();
  if (input.value !== "") {
    let currentList = JSON.parse(localStorage.getItem("tolist")) || [];
    currentList.push({ id: Date.now(), done: false, message: input.value });
    localStorage.setItem("tolist", JSON.stringify(currentList));
    input.value = "";
    getToList();
  }
});

function removeElement(index) {
  let currentList = JSON.parse(localStorage.getItem("tolist")) || [];
  let updateList = currentList.filter((list) => parseInt(list.id) !== index);
  localStorage.setItem("tolist", JSON.stringify(updateList));
  getToList();
}
function addcheck(index) {
  let currentList = JSON.parse(localStorage.getItem("tolist")) || [];
  currentList.forEach((list) => {
    if (parseInt(list.id) === index) {
      list.done = true;
    }
  });
  localStorage.setItem("tolist", JSON.stringify(currentList));
  getToList();
}
function displayAlert() {
  const overlay = document.createElement("div");
  overlay.className = "overlay";

  document.body.appendChild(overlay);

  const container = document.createElement("div");
  container.className = "finish-task";

  const span = document.createElement("span");
  const checkIcon = document.createElement("i");
  checkIcon.className = "fa-solid fa-check ";
  span.appendChild(checkIcon);

  const alertTxt = document.createElement("h1");
  const alertTxtNode = document.createTextNode("good job");
  alertTxt.appendChild(alertTxtNode);

  const buttonCheck = document.createElement("button");
  const buttonCheckTxt = document.createTextNode("ok");
  buttonCheck.appendChild(buttonCheckTxt);
  buttonCheck.className = "btn close";

  container.appendChild(span);
  container.appendChild(alertTxt);
  container.appendChild(buttonCheck);

  document.body.appendChild(container);
}
function handleRomveAlert() {
  document
    .querySelector(".finish-task .close")
    .addEventListener("click", (e) => {
      document.querySelector(".overlay").remove();
      e.target.parentNode.remove();
    });
}
function getToList() {
  let tolist = JSON.parse(localStorage.getItem("tolist")) || [];
  const displayList = document.querySelector(".display-list");
  const totalTask = document.querySelector(".num-tasks .total-task");
  const countDone = document.querySelector(".num-tasks .count-done");
  let count = 0;
  displayList.innerHTML = "";
  tolist.forEach((element) => {
    let check = "";
    if (element.done) {
      count++;
      check = "check";
    }
    displayList.innerHTML += `
          <div class="box ${check}">
            <p>${element.message}</p>
            <div class="control">
            <button class="btn done" data-id="${element.id}">
              <i class="fa-solid fa-check"></i>
            </button>
            <button class="btn delete" data-id="${element.id}">
              <i class="fa-solid fa-trash-can"></i>
            </button>
            </div>
          </div>
    `;
  });
  totalTask.innerHTML = tolist.length;
  countDone.innerHTML = count;
  if (tolist.length === count) {
    displayAlert();
    handleRomveAlert();
  }
  const allButtonDelete = document.querySelectorAll(".delete");

  allButtonDelete.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      let index = parseInt(e.target.getAttribute("data-id"));
      removeElement(index);
    });
  });

  const allButtonDone = document.querySelectorAll(".display-list .done");
  allButtonDone.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      let index = parseInt(e.target.getAttribute("data-id"));
      addcheck(index);
    });
  });
}

getToList();
