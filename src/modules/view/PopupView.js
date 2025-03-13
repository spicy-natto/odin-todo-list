import { format } from "date-fns";
import Task from "../items/Task.js";

class PopupView {
  popupAndDim = document.getElementById("popup-and-dim");

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
    input.setAttribute("type", "text");
    input.setAttribute("value", item.name);
    div.appendChild(input);

    const textArea = document.createElement("textarea");
    textArea.classList.add("popup-descr");
    textArea.value = item.description;
    div.appendChild(textArea);

    return div;
  }

  #createTaskInfo(task, projects) {
    const taskInfoDiv = document.createElement("div");
    taskInfoDiv.classList.add("popup-task-info");
    taskInfoDiv.appendChild(this.#createTaskDate(task));
    taskInfoDiv.appendChild(this.#createProjectSelect(task, projects));

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

  render(item, projects) {
    this.popupAndDim.innerHTML = "";
    this.popupAndDim.appendChild(this.#createItemDom(item, projects));
  }
}

export default PopupView;
