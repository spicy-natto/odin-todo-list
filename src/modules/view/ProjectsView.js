import util from "../utilities/utilities.js";
import addIcon from "../../images/plus-circle.svg";
import projectIcon from "../../images/pound.svg";
import deleteIcon from "../../images/delete-trashcan.svg";
import editIcon from "../../images/edit-square-pencil.svg";
import Event from "../controller/Event.js";
import Project from "../items/Project.js";

class ProjectsView {
  projectList = document.getElementById("project-list");
  projectSelectEvent = new Event();
  projectDeleteEvent = new Event();
  projectEditEvent = new Event();
  projectAddEvent = new Event();

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

    const editButton = document.createElement("button");
    editButton.classList.add("project-edit-button");
    editButton.setAttribute("type", "button");
    editButton.setAttribute("tabindex", "0");
    const editSvg = util.htmlToNode(editIcon);
    editButton.appendChild(editSvg);
    editButton.addEventListener("click", this.#getEditEventFunction(project));
    li.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("project-delete-button");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("tabindex", "0");
    const deleteSvg = util.htmlToNode(deleteIcon);
    deleteButton.appendChild(deleteSvg);
    deleteButton.addEventListener(
      "click",
      this.#getDeleteEventFunction(project),
    );
    li.appendChild(deleteButton);

    return li;
  }

  #createProjectButton() {
    const addLi = document.createElement("li");
    addLi.classList.add("project-add");

    const icon = util.htmlToNode(addIcon);
    icon.classList.add("project-add-icon");
    addLi.appendChild(icon);

    const label = document.createElement("div");
    label.textContent = "Add Project";
    label.classList.add("project-add-text");
    addLi.appendChild(label);

    addLi.addEventListener("click", this.#addProjectEvent);
    return addLi;
  }

  #addProjectEvent = () =>
    this.projectAddEvent.trigger(
      new Project({ name: "New Project", description: "" })
    );

  #getFilterEventFunction(project) {
    return () => this.projectSelectEvent.trigger(project);
  }

  #getDeleteEventFunction(project) {
    return (event) => {
      event.stopPropagation();
      this.projectDeleteEvent.trigger(project);
    };
  }

  #getEditEventFunction(project) {
    return (event) => {
      event.stopPropagation();
      this.projectEditEvent.trigger(project);
    };
  }

  render(projects) {
    this.projectList.innerHTML = "";

    this.projectList.appendChild(this.#createProjectButton());

    projects.forEach((project) => {
      const projectDom = this.#createDom(project);
      projectDom.addEventListener(
        "click",
        this.#getFilterEventFunction(project),
      );
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
