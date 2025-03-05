import "./css/styles.css";
import UiStateHandler from "./modules/state/UiStateHandler.js";
import ViewHandler from "./modules/view/ViewHandler.js";
import testUtil from "./modules/utilities/testUtilities.js";
import { addDays } from "date-fns";

const uiState = new UiStateHandler();

//projects[3] is unused by tasks
const projects = testUtil.initProjectArray(4);

projects[0].dueDate = addDays(projects[0].dueDate, -1);
projects[2].dueDate = addDays(projects[2].dueDate, 2);

const tasks = testUtil.initTaskArray(6);
tasks[0].project = projects[0].id;
tasks[0].dueDate = addDays(tasks[0].dueDate, -1);
tasks[1].project = projects[0].id;
tasks[2].project = projects[1].id;
tasks[2].dueDate = addDays(tasks[2].dueDate, 1);
tasks[3].project = projects[1].id;
tasks[3].dueDate = addDays(tasks[3].dueDate, 2);
tasks[4].project = projects[2].id;
tasks[4].dueDate = addDays(tasks[4].dueDate, 3);
tasks[5].project = projects[2].id;
tasks[5].dueDate = addDays(tasks[5].dueDate, 4);

const viewHandler = new ViewHandler();
console.log(UiStateHandler.sideBarItems);
viewHandler.renderSidebar(UiStateHandler.sideBarItems);
viewHandler.renderAddTask();

viewHandler.renderProjects(projects);
viewHandler.renderTitle(projects[0]);
viewHandler.renderTasks(uiState.createTaskViewData(projects, tasks));