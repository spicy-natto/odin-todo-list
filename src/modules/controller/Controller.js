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
    this.viewHandler.sideBar.SidebarSelectEvent.addListener(this.selectSidebarFun);
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
          this.viewHandler.sideBar.deselect();
          this.viewHandler.projects.deselect();
          this.viewHandler.projects.select(project);
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
          this.viewHandler.projects.deselect();
          this.viewHandler.sideBar.deselect();
          this.viewHandler.sideBar.select(sidebarItem);
      }
  }
}

export default Controller;
