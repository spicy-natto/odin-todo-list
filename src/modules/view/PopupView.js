import { format } from "date-fns";
import Task from "../items/Task.js";
import Event from "../controller/Event.js";
import { parse } from "date-fns";

class PopupView {
  popupAndDim = document.getElementById("popup-and-dim");
  popupOkEvent = new Event();
  popupCancelEvent = new Event();

  #createItemDom(item, projects) {
    const popupDiv = document.createElement("div");
    popupDiv.classList.add("popup");
    popupDiv.setAttribute("id", "popup");

    const popupForm = document.createElement("form");
    popupForm.classList.add("popup-form");
    popupDiv.appendChild(popupForm);

    popupForm.appendChild(this.#createPopupNameAndDescr(item));

    if (item instanceof Task) {
      popupForm.appendChild(this.#createTaskInfo(item, projects));
    }

    return popupDiv;
  }

  #createPopupNameAndDescr(item) {
    const div = document.createElement("div");
    div.classList.add("popup-name-descr");

    const input = document.createElement("input");
    input.classList.add("popup-name");
    input.setAttribute("id", "popup-name");
    input.setAttribute("type", "text");
    input.setAttribute("value", item.name);
    div.appendChild(input);

    const textArea = document.createElement("textarea");
    textArea.classList.add("popup-descr");
    textArea.setAttribute("id", "popup-descr");
    textArea.value = item.description;
    div.appendChild(textArea);

    return div;
  }

  #createTaskInfo(task, projects) {
    const taskInfoDiv = document.createElement("div");
    taskInfoDiv.classList.add("popup-task-info");
    taskInfoDiv.appendChild(this.#createTaskDate(task));
    taskInfoDiv.appendChild(this.#createProjectSelect(task, projects));
    taskInfoDiv.appendChild(this.#createPrioritySelect(task));
    taskInfoDiv.appendChild(this.#createCheckbox());
    taskInfoDiv.appendChild(this.#createOkButton());
    taskInfoDiv.appendChild(this.#createCancelButton());

    return taskInfoDiv;
  }

  #createTaskDate(task) {
    const div = document.createElement("div");

    const label = document.createElement("label");
    label.setAttribute("for", "task-date");
    label.classList.add("popup-date-label");
    label.textContent = "Due Date:";
    div.appendChild(label);

    const input = document.createElement("input");
    input.setAttribute("type", "date");
    input.setAttribute("name", "task-date");
    input.setAttribute("id", "task-date");
    input.classList.add("popup-date");
    input.value = format(task.dueDate, "yyyy-MM-dd");
    div.appendChild(input);

    return div;
  }

  #createProjectSelect(task, projects) {
    const div = document.createElement("div");

    const label = document.createElement("label");
    label.setAttribute("for", "task-proj-select");
    label.classList.add("task-proj-label");
    label.textContent = "Project:";
    div.appendChild(label);

    const select = document.createElement("select");
    select.setAttribute("name", "task-project");
    select.setAttribute("id", "task-proj-select");
    select.classList.add("popup-task-proj");
    projects.forEach((project) =>
      select.appendChild(this.#createProjectOption(project)),
    );
    select.value = task.project;
    div.appendChild(select);

    return div;
  }

  #createProjectOption(project) {
    const option = document.createElement("option");
    option.setAttribute("value", project.id);
    option.textContent = project.name;
    return option;
  }

  #createPrioritySelect(task) {
    const div = document.createElement("div");

    const label = document.createElement("label");
    label.setAttribute("for", "task-priority-select");
    label.classList.add("task-priority-label");
    label.textContent = "Priority:";
    div.appendChild(label);

    const select = document.createElement("select");
    select.setAttribute("name", "task-priority");
    select.setAttribute("id", "task-priority-select");
    select.classList.add("popup-task-priority");
    Task.priorities.forEach((priority) =>
      select.appendChild(this.#createPriorityOption(priority)),
    );
    select.value = task.priority;
    div.appendChild(select);

    return div;
  }

  #createPriorityOption(priority) {
    const option = document.createElement("option");
    option.setAttribute("value", priority);
    option.textContent = priority;
    return option;
  }

  #createCheckbox() {
    const div = document.createElement("div");
    const label = document.createElement("label");
    label.setAttribute("for", "task-completed-select");
    label.classList.add("task-priority-label");
    label.textContent = "Completed:";
    div.appendChild(label);

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("name", "task-completed");
    input.setAttribute("id", "task-completed");
    input.classList.add("popup-task-completed");
    div.appendChild(input);

    return div;
  }

  #createOkButton() {
    const button = document.createElement("button");
    button.setAttribute("id", "popup-ok");
    button.setAttribute("type", "button");
    button.textContent = "OK";
    button.classList.add("popup-ok");
    button.addEventListener("click", this.#okEventFunction);

    return button;
  }

  #createCancelButton() {
    const button = document.createElement("button");
    button.setAttribute("id", "popup-cancel");
    button.setAttribute("type", "button");
    button.textContent = "Cancel";
    button.classList.add("popup-cancel");
    button.addEventListener("click", () => this.popupCancelEvent.trigger());

    return button;
  }


  #createDimDiv() {
    const dimDiv = document.createElement("div");
    dimDiv.setAttribute("id", "dim-screen");
    return dimDiv;
  }

  #okEventFunction = () => {
    const name = document.getElementById("popup-name").value;
    const description = document.getElementById("popup-descr").value;
    const dueDate = parse(document.getElementById("task-date").value, 'yyyy-MM-dd', new Date());
    const project = document.getElementById("task-proj-select").value;
    const priority = document.getElementById("task-priority-select").value;
    const completed = document.getElementById("task-completed").checked;

    const task = new Task({
      name: name,
      description: description,
      dueDate: dueDate,
      project: project,
      priority: priority,
      completed: completed,
    });

    this.popupOkEvent.trigger(task);
  };

  render(item, projects) {
    this.popupAndDim.innerHTML = "";
    this.popupAndDim.appendChild(this.#createItemDom(item, projects));
    this.popupAndDim.appendChild(this.#createDimDiv());
  }

  clear() {
    this.popupAndDim.innerHTML = "";
  }
}

export default PopupView;
