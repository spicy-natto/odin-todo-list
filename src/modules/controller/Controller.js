import ViewHandler from "../view/ViewHandler.js";
import UiStateHandler from "../state/UiStateHandler.js";
import StorageHandler from "../storage/StorageHandler.js";
import Task from "../items/Task.js";

class Controller {
  viewHandler = new ViewHandler();
  uiState = new UiStateHandler();
  storageHandler = new StorageHandler();

  init() {
    this.storageHandler.loadFromStorage();
    this.viewHandler.sideBar.render(UiStateHandler.sidebarItems);
    this.viewHandler.addTask.renderButton();
    this.viewHandler.projects.render(this.storageHandler.projects);
    this.#renderTitle();
    this.#selectFilter();
    this.#renderTaskList();
    this.#subscribeToEvents();
  }

  #subscribeToEvents() {
    this.viewHandler.projects.projectSelectEvent.addListener(
      this.#filterSelectFunction,
    );
    this.viewHandler.sideBar.SidebarSelectEvent.addListener(
      this.#filterSelectFunction,
    );
    this.viewHandler.addTask.addTaskEvent.addListener(
      this.#triggerPopupFunction,
    );
    this.viewHandler.popup.popupOkEvent.addListener(this.#popupOkFunction);
    this.viewHandler.popup.popupCancelEvent.addListener(
      this.#popupCancelFunction,
    );
    this.viewHandler.tasks.completeTaskEvent.addListener(
      this.#taskCompleteFunction,
    );
    this.viewHandler.tasks.deleteTaskEvent.addListener(
      this.#taskDeleteFunction,
    );
    this.viewHandler.tasks.editTaskEvent.addListener(
      this.#triggerPopupFunction,
    );
  }

  #selectFilter() {
    this.viewHandler.sideBar.deselect();
    this.viewHandler.projects.deselect();
    this.viewHandler.projects.select(this.uiState.filter);
    this.viewHandler.sideBar.select(this.uiState.filter);
  }

  #renderTaskList() {
    this.viewHandler.tasks.render(
      this.uiState.createTaskViewData(
        this.storageHandler.projects,
        this.storageHandler.tasks,
      ),
    );
  }

  #renderTitle() {
    this.viewHandler.title.render(this.uiState.filter);
  }

  #filterSelectFunction = (item) => {
    this.uiState.filter = item;
    this.#renderTaskList();
    this.#selectFilter();
    this.#renderTitle();
  };

  #triggerPopupFunction = (task) => {
    this.viewHandler.popup.render(task, this.storageHandler.projects);
  };

  #popupOkFunction = (task) => {
    this.storageHandler.set(task);
    this.viewHandler.popup.clear();
    this.#renderTaskList();
  };

  #popupCancelFunction = () => {
    this.viewHandler.popup.clear();
  };

  #taskCompleteFunction = (task) => {
    const completedTask = new Task(
      Object.assign({}, task, { completed: !task.completed }),
    );
    this.storageHandler.set(completedTask);
    this.#renderTaskList();
  };

  #taskDeleteFunction = (task) => {
    this.storageHandler.delete(task.id);
    this.#renderTaskList();
  };
}

export default Controller;
