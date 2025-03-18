import util from "../utilities/utilities.js";
import projectIcon from "../../images/pound.svg";
import Event from "../controller/Event.js";

class ProjectsView {
  projectList = document.getElementById("project-list");
  projectSelectEvent = new Event();

  #createDom(project) {
    const li = document.createElement("li");
    li.classList.add("project");

    const icon = util.htmlToNode(projectIcon);
    icon.classList.add("project-icon");
    li.appendChild(icon);

    const label = document.createElement("div");
    label.classList.add("project-name");
    label.textContent = project.name;
    li.appendChild(label);

    return li;
  }

  #triggerEvent(project) {
    return () => this.projectSelectEvent.trigger(project);
  }

  render(projects) {
    this.projectList.innerHTML = "";
    projects.forEach((project) => {
      const projectDom = this.#createDom(project);
      projectDom.addEventListener("click", this.#triggerEvent(project));
      this.projectList.appendChild(projectDom);
    });
  }
}

export default ProjectsView;
