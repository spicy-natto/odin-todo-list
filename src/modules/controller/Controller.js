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
    this.viewHandler.tasks.render(
      this.uiState.createTaskViewData(
        this.storageHandler.projects,
        this.storageHandler.tasks,
      ),
    );

    this.#selectFilter();

    this.#subscribeToEvents();
  }

  #subscribeToEvents() {
    this.viewHandler.projects.projectSelectEvent.addListener(this.selectProjectFun);
    this.viewHandler.sideBar.SidebarSelectEvent.addListener(this.selectSidebarFun);
  }

  #selectFilter() {
    this.viewHandler.sideBar.deselect();
    this.viewHandler.projects.deselect();
    this.viewHandler.projects.select(this.uiState.filter);
    this.viewHandler.sideBar.select(this.uiState.filter);
  }

  get selectProjectFun() {
    return (project) => {
        this.uiState.filter = project;
        this.viewHandler.tasks.render(
            this.uiState.createTaskViewData(
              this.storageHandler.projects,
              this.storageHandler.tasks,
            ),
          );
          this.#selectFilter();
      }
  }

  get selectSidebarFun() {
    return (sidebarItem) => {
        this.uiState.filter = sidebarItem;
        this.viewHandler.tasks.render(
            this.uiState.createTaskViewData(
              this.storageHandler.projects,
              this.storageHandler.tasks,
            ),
          );
          this.#selectFilter();
      }
  }
}

export default Controller;
