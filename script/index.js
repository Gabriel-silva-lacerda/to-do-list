// HTML variables
const input = document.querySelector(".add-text");
const btnAdd = document.querySelector(".btn");
const ul = document.querySelector(".list");
const li = document.querySelectorAll("li");
const btn = document.querySelector(".check");
const error = document.querySelector(".red-error");

// LocalStorage variables
const localStorageKey = "to-do-list";
const values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

// Save localstorage 
const saveLocalStorage = () => {
  const arrayTasks = [...ul.querySelectorAll("li")].map((li) => {
    const p = li.querySelector("p");
    const checkTask = p.classList.contains("check-task");
    return { text: p.innerText, check: checkTask };
  });
  localStorage.setItem(localStorageKey, JSON.stringify(arrayTasks));
};

// Validade same task
const validateSameTask = () => {
  const values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
  const exits = values.find((x) => x.text === input.value.trim());
  return !exits ? false : true;
}

// Save taks 
const saveTask = () => {
  // Validation task
  const validateInput = input.value.trim().length > 0;
   if(!validateInput) {
      error.style.display = 'block';
      error.innerHTML = 'Write your task!';
      input.classList.add('error');
   } else if(validateSameTask()) {
      error.innerHTML = 'Task already added!';
      error.style.display = 'block';
   } else {
      error.style.display = 'none';
      input.classList.remove('error');

      const li = document.createElement("li");
      const p = document.createElement("p");
      li.appendChild(p);
      p.innerText = input.value;
      input.value = "";
      input.focus();

      //Creat btn check
      const btnCheck = document.createElement("button");
      btnCheck.classList.add("check", "button-color");
      btnCheck.innerHTML =
        '<span class="material-symbols-rounded">check_circle</span>';
      li.appendChild(btnCheck);
      btnCheck.addEventListener("click", () =>
        handleClickCheck(btnCheck, btnNoCheck, li, p)
      );

      // Creat btn no-check
      const btnNoCheck = document.createElement("button");
      btnNoCheck.classList.add("no-check", "button-color");
      btnNoCheck.innerHTML =
        '<span class="material-symbols-rounded">radio_button_unchecked</span>';
      li.appendChild(btnNoCheck);
      btnNoCheck.addEventListener("click", () =>
        handleClickCheck(btnCheck, btnNoCheck, li, p)
      );

      // Creat btn remove
      const btnRemove = document.createElement("button");
      btnRemove.classList.add("remove", "button-color");
      btnRemove.innerHTML = '<span class="material-symbols-outlined">delete<span>';
      li.appendChild(btnRemove);
      btnRemove.addEventListener("click", () => handleClickRemove(li));
      ul.appendChild(li);
      saveLocalStorage();
    }
};

// Save when updating
const saveRefresh = () => {
  values.forEach((element) => {
    const li = document.createElement("li");
    const p = document.createElement("p");
    li.appendChild(p);
    p.innerHTML = element.text;

    input.value = "";
    input.focus();

    // Creat btn check
    const btnCheck = document.createElement("button");
    btnCheck.classList.add("check", "button-color");
    btnCheck.innerHTML =
      '<span class="material-symbols-rounded">check_circle</span>';
    li.appendChild(btnCheck);
    btnCheck.addEventListener("click", () =>
      handleClickCheck(btnCheck, btnNoCheck, li, p)
    );

    // Creat btn no-check
    const btnNoCheck = document.createElement("button");
    btnNoCheck.classList.add("no-check", "button-color");
    btnNoCheck.innerHTML =
      '<span class="material-symbols-rounded">radio_button_unchecked</span>';
    li.appendChild(btnNoCheck);
    btnNoCheck.addEventListener("click", () =>
      handleClickCheck(btnCheck, btnNoCheck, li, p)
    );

    if (element.check) {
      p.classList.toggle("check-task");
      li.classList.toggle("color-check");
      btnCheck.classList.toggle("check");
      btnNoCheck.classList.toggle("display");
    }

    // Creat btn remove
    const btnRemove = document.createElement("button");
    btnRemove.classList.add("remove", "button-color");
    btnRemove.innerHTML =
      '<span class="material-symbols-outlined">delete<span>';
    li.appendChild(btnRemove);
    btnRemove.addEventListener("click", () => handleClickRemove(li));
    ul.appendChild(li);

  });
};
saveRefresh();

// Remove button
const handleClickRemove = (li, p) => {
  const index = values.findIndex(x => x.tarefa === p )
  values.splice(index, 1)
  li.remove();
  saveLocalStorage();
};

// No check task
const handleClickCheck = (btnCheck, btnNoCheck, li, p) => {
  btnCheck.classList.toggle("check");
  btnNoCheck.classList.toggle("display");
  li.classList.toggle("color-check");
  p.classList.toggle("check-task");
   saveLocalStorage();
};

//  Action on keystroke
function addKeyPress() {
  if (input.value.length > 0 && event.which === 13) {
    saveTask();
  }
}

btnAdd.addEventListener("click", saveTask);
input.addEventListener('keypress', addKeyPress);
