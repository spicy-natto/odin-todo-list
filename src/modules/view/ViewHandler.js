import util from "../utilities/utilities.js";
import addIcon from "../../images/plus-circle.svg";

class ViewHandler {
  sidebarList = document.getElementById("sidebar-items");
  addDiv = document.getElementById("add-task");

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

    console.log(li);
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
}

export default ViewHandler;
