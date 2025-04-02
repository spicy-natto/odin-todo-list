import { format } from "date-fns";
import util from "../utilities/utilities.js";
import Event from "../controller/Event.js";
import deleteIcon from "../../images/delete-trashcan.svg";
import completedIcon from "../../images/check.svg";

class TaskListView {
  taskList = document.getElementById("tasks");
  completeTaskEvent = new Event();
  editTaskEvent = new Event();
  deleteTaskEvent = new Event();

  #createDom(projects, task) {
    const li = document.createElement("li");
    li.classList.add("task");
    li.setAttribute("tabindex", "0");
    li.addEventListener("click", this.#triggerEditTaskEvent(task));

    const completedButton = document.createElement("button");
    completedButton.setAttribute("type", "button");
    completedButton.classList.add("task-completed-button");
    const completedSvg = util.htmlToNode(completedIcon);
    completedButton.appendChild(completedSvg);
    if (task.completed) completedButton.classList.add("task-completed");
    completedButton.addEventListener(
      "click",
      this.#triggerCompleteTaskEvent(task),
    );
    li.appendChild(completedButton);

    const titleDiv = document.createElement("p");
    titleDiv.classList.add("task-title");
    titleDiv.textContent = task.name;
    li.appendChild(titleDiv);

    const exitButton = document.createElement("button");
    exitButton.setAttribute("type", "button");
    exitButton.classList.add("task-delete-button");
    const deleteSVG = util.htmlToNode(deleteIcon);
    exitButton.appendChild(deleteSVG);
    exitButton.addEventListener("click", this.#triggerDeleteTaskEvent(task));
    li.appendChild(exitButton);

    const descrDiv = document.createElement("p");
    descrDiv.classList.add("task-descr");
    descrDiv.textContent = task.description;
    li.appendChild(descrDiv);

    const dateProjectDiv = document.createElement("div");
    dateProjectDiv.classList.add("task-date-project");
    li.appendChild(dateProjectDiv);

    const date = document.createElement("p");
    date.classList.add("task-date");
    date.textContent = format(task.dueDate, "MMM d");
    dateProjectDiv.appendChild(date);

    const projectName = document.createElement("p");
    projectName.classList.add("task-project");
    projectName.textContent = projects[task.project]?.name;
    dateProjectDiv.appendChild(projectName);

    return li;
  }

  #triggerCompleteTaskEvent(task) {
    return (event) => {
      event.stopPropagation();
      this.completeTaskEvent.trigger(task);
    };
  }

  #triggerEditTaskEvent(task) {
    return () => this.editTaskEvent.trigger(task);
  }

  #triggerDeleteTaskEvent(task) {
    return (event) => {
      event.stopPropagation();
      this.deleteTaskEvent.trigger(task);
    };
  }

  render({ projects, tasks }) {
    this.taskList.innerHTML = "";
    tasks.forEach((task) =>
      this.taskList.appendChild(this.#createDom(projects, task)),
    );
  }
}

export default TaskListView;
