import ViewHandler from "../view/ViewHandler.js";
import UiStateHandler from "../state/UiStateHandler.js";
import StorageHandler from "../storage/StorageHandler.js";

class Controller {
  viewHandler = new ViewHandler();
  uiState = new UiStateHandler();
  storageHandler = new StorageHandler();

  init() {
    this.storageHandler.loadFromStorage();

    this.viewHandler.sideBar.render(UiStateHandler.sideBarItems);
    this.viewHandler.addTask.renderButton();
    this.viewHandler.projects.render(this.storageHandler.projects);
    this.viewHandler.title.render(this.uiState.filter);
    this.viewHandler.tasks.render(
      this.uiState.createTaskViewData(
        this.storageHandler.projects,
        this.storageHandler.tasks,
      ),
    );

    this.#subscribeToEvents();
  }

  #subscribeToEvents() {
    this.viewHandler.projects.projectSelectEvent.addListener(this.selectProjectFun);
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
      }
  }
}

export default Controller;
