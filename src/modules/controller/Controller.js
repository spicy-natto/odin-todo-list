import ViewHandler from "../view/ViewHandler.js";
import UiStateHandler from "../state/UiStateHandler.js";
import StorageHandler from "../storage/StorageHandler.js";

class Controller {
  viewHandler = new ViewHandler();
  uiState = new UiStateHandler();
  storageHandler = new StorageHandler();

  init() {
    this.storageHandler.loadFromStorage();

    this.viewHandler.sideBar.render(UiStateHandler.sidebarItems);
    this.viewHandler.addTask.renderButton();
    this.viewHandler.projects.render(this.storageHandler.projects);
    this.viewHandler.title.render(this.uiState.filter);

    this.#selectFilter();
    this.#subscribeToEvents();
  }

  #subscribeToEvents() {
    this.viewHandler.projects.projectSelectEvent.addListener(
      this.filterSelectFunction,
    );
    this.viewHandler.sideBar.SidebarSelectEvent.addListener(
      this.filterSelectFunction,
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

  get filterSelectFunction() {
    return (item) => {
      this.uiState.filter = item;
      this.#renderTaskList();
      this.#selectFilter();
    };
  }
}

export default Controller;
