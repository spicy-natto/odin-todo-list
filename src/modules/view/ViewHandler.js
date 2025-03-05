import { format } from "date-fns";
import SidebarView from "./SidebarView.js";
import AddTaskView from "./AddTaskView.js";
import ProjectsView from "./ProjectsView.js";
import TitleView from "./TitleView.js";

class ViewHandler {
  taskList = document.getElementById("tasks");

  addTask = new AddTaskView();
  sideBar = new SidebarView();
  projects = new ProjectsView();
  title = new TitleView();

  #createTaskDom(projects, { name, description, dueDate, project }) {
    const li = document.createElement("li");
    li.classList.add("task");

    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.classList.add("task-button");
    li.appendChild(button);

    const contentDiv = document.createElement("div");
    contentDiv.classList.add("task-content");
    li.appendChild(contentDiv);

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("task-info");
    contentDiv.appendChild(infoDiv);

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("task-title");
    titleDiv.textContent = name;
    infoDiv.appendChild(titleDiv);

    const descrDiv = document.createElement("div");
    descrDiv.classList.add("task-descr");
    descrDiv.textContent = description;
    infoDiv.appendChild(descrDiv);

    const dateProjectDiv = document.createElement("div");
    dateProjectDiv.classList.add("task-date-project");
    contentDiv.appendChild(dateProjectDiv);

    const date = document.createElement("p");
    date.classList.add("task-date");
    date.textContent = format(dueDate, "MMM d");
    dateProjectDiv.appendChild(date);

    const projectName = document.createElement("p");
    projectName.classList.add("task-project");
    projectName.textContent = projects[project].name;
    dateProjectDiv.appendChild(projectName);

    return li;
  }

  renderTasks({projects, tasks}) {
    this.taskList.innerHTML = "";
    tasks.forEach((task) =>
      this.taskList.appendChild(this.#createTaskDom(projects, task))
    );
  }
}

export default ViewHandler;
