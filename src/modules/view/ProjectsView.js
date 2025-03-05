import util from "../utilities/utilities.js";
import projectIcon from "../../images/pound.svg";

class ProjectsView {
    projectList = document.getElementById("project-list");

      #createDom({ name }) {
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

      render(projects) {
        this.projectList.innerHTML = "";
        projects.forEach((project) =>
          this.projectList.appendChild(this.#createDom(project)),
        );
      }
}

export default ProjectsView;