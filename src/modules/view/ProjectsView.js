import util from "../utilities/utilities.js";
import projectIcon from "../../images/pound.svg";
import Event from "../controller/Event.js";

class ProjectsView {
  projectList = document.getElementById("project-list");
  projectSelectEvent = new Event();

  #createDom(project) {
    const li = document.createElement("li");
    li.classList.add("project");
    li.setAttribute("id", project.id);
    li.setAttribute("tabindex", "0");

    const icon = util.htmlToNode(projectIcon);
    icon.classList.add("project-icon");
    li.appendChild(icon);

    const label = document.createElement("div");
    label.classList.add("project-name");
    label.textContent = project.name;
    li.appendChild(label);

    return li;
  }

  #getTriggerEvent(project) {
    return () => this.projectSelectEvent.trigger(project);
  }

  render(projects) {
    this.projectList.innerHTML = "";
    projects.forEach((project) => {
      const projectDom = this.#createDom(project);
      projectDom.addEventListener("click", this.#getTriggerEvent(project));
      this.projectList.appendChild(projectDom);
    });
  }

  deselect() {
    const projectsDom = Array.from(document.getElementsByClassName("project"));
    projectsDom.forEach((item) => item.classList.remove("sidebar-selected"));
  }

  select(project) {
    const projectDom = document.getElementById(project.id);
    projectDom.classList.add("sidebar-selected");
  }
}

export default ProjectsView;
