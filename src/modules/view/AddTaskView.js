import util from "../utilities/utilities.js";
import addIcon from "../../images/plus-circle.svg";

class AddTaskView {
  addDiv = document.getElementById("add-task");

  renderButton() {
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

export default AddTaskView;
