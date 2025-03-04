import util from "../utilities/utilities.js";
import addIcon from "../../images/plus-circle.svg";
import projectIcon from "../../images/pound.svg";

class ViewHandler {
  sidebarList = document.getElementById("sidebar-items");
  addDiv = document.getElementById("add-task");
  projectList = document.getElementById("project-list");

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
    projects.forEach((item) =>
      this.projectList.appendChild(this.#createProjectDom(item)),
    );
  }
}

export default ViewHandler;
