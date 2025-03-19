import { format } from "date-fns";

class TaskListView {
  taskList = document.getElementById("tasks");

  #createDom(projects, task) {
    const li = document.createElement("li");
    li.classList.add("task");
    li.setAttribute("tabindex", "0");

    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.classList.add("task-button");
    if (task.completed) button.classList.add("task-button-completed");
    li.appendChild(button);

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("task-content");
    li.appendChild(contentDiv);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("task-info");
    contentDiv.appendChild(infoDiv);

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("task-title");
    titleDiv.textContent = task.name;
    infoDiv.appendChild(titleDiv);

    const descrDiv = document.createElement("div");
    descrDiv.classList.add("task-descr");
    descrDiv.textContent = task.description;
    infoDiv.appendChild(descrDiv);

    const dateProjectDiv = document.createElement("div");
    dateProjectDiv.classList.add("task-date-project");
    contentDiv.appendChild(dateProjectDiv);

    const date = document.createElement("p");
    date.classList.add("task-date");
    date.textContent = format(task.dueDate, "MMM d");
    dateProjectDiv.appendChild(date);

    const projectName = document.createElement("p");
    projectName.classList.add("task-project");
    projectName.textContent = projects[task.project]?.name;
    dateProjectDiv.appendChild(projectName);

    return li;
  }

  render({ projects, tasks }) {
    this.taskList.innerHTML = "";
    tasks.forEach((task) =>
      this.taskList.appendChild(this.#createDom(projects, task)),
    );
  }
}

export default TaskListView;
