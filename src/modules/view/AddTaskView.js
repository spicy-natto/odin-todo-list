import util from "../utilities/utilities.js";
import addIcon from "../../images/plus-circle.svg";
import Task from "../items/Task.js";
import Event from "../controller/Event.js";

class AddTaskView {
  addDiv = document.getElementById("task-add");
  addTaskEvent = new Event();

  renderButton() {
    const icon = util.htmlToNode(addIcon);
    icon.classList.add("sidebar-icon");

    const label = document.createElement("div");
    label.textContent = "Add Task";
    label.classList.add("task-add-text");

    this.addDiv.innerHTML = "";
    this.addDiv.appendChild(icon);
    this.addDiv.appendChild(label);

    this.addDiv.addEventListener("click", this.#triggerEvent);
  }

  #triggerEvent = () =>
    this.addTaskEvent.trigger(new Task({ name: "New Task", description: "" }));
}

export default AddTaskView;
