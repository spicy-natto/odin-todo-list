import util from "../utilities/utilities.js";
import addIcon from "../../images/plus-circle.svg";
import projectIcon from "../../images/pound.svg";
import { format } from "date-fns";

class ViewHandler {
  sidebarList = document.getElementById("sidebar-items");
  addDiv = document.getElementById("add-task");
  projectList = document.getElementById("project-list");
  title = document.getElementById("filter-title");
  taskList = document.getElementById("tasks");

  #createSidebarDom({ svg, name }) {
    const li = document.createElement("li");
    li.classList.add("sidebar-item");

    const icon = util.htmlToNode(svg);
    icon.classList.add("sidebar-icon");
    li.appendChild(icon);

    const label = document.createElement("div");
    label.classList.add("sidebar-label");
    label.textContent = name;
    li.appendChild(label);

    return li;
  }

  renderSidebar(sidebarItems) {
    this.sidebarList.innerHTML = "";
    sidebarItems.forEach((item) =>
      this.sidebarList.appendChild(this.#createSidebarDom(item)),
    );
  }

  renderAddTask() {
    const icon = util.htmlToNode(addIcon);
    icon.classList.add("sidebar-icon");

    const label = document.createElement("div");
    label.textContent = "Add Task";
    label.classList.add("add-task-text");

    this.addDiv.innerHTML = "";
    this.addDiv.appendChild(icon);
    this.addDiv.appendChild(label);
  }

  #createProjectDom({ name }) {
    const li = document.createElement("li");
    li.classList.add("project");

    const icon = util.htmlToNode(projectIcon);
    icon.classList.add("project-icon");
    li.appendChild(icon);

    const label = document.createElement("div");
    label.classList.add("project-name");
    label.textContent = name;
    li.appendChild(label);

    return li;
  }

  renderProjects(projects) {
    this.projectList.innerHTML = "";
    projects.forEach((project) =>
      this.projectList.appendChild(this.#createProjectDom(project)),
    );
  }

  renderTitle({ name, description }) {
    this.title.innerHTML = "";

    const h1 = document.createElement("h1");
    h1.textContent = name;
    this.title.appendChild(h1);

    const p = document.createElement("p");
    p.textContent = description;
    this.title.appendChild(p);
  }

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
