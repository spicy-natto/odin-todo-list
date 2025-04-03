import "./css/styles.css";
// import testUtil from "./modules/utilities/testUtilities.js";
// import StorageHandler from "./modules/storage/StorageHandler.js";
// import { addDays } from "date-fns";
import Controller from "./modules/controller/Controller.js";

// localStorage.clear();
// const storageHandler = new StorageHandler();

// //projects[3] is unused by tasks
// const projects = testUtil.initProjectArray(4);

// projects[0].dueDate = addDays(projects[0].dueDate, -1);
// projects[2].dueDate = addDays(projects[2].dueDate, 2);
// projects.forEach((project) => storageHandler.set(project));

// const tasks = testUtil.initTaskArray(7);
// tasks[0].project = projects[0].id;
// tasks[0].dueDate = addDays(tasks[0].dueDate, -1);
// tasks[1].project = projects[0].id;
// tasks[2].project = projects[1].id;
// tasks[2].dueDate = addDays(tasks[2].dueDate, 1);
// tasks[3].project = projects[1].id;
// tasks[3].dueDate = addDays(tasks[3].dueDate, 2);
// tasks[4].project = projects[2].id;
// tasks[4].dueDate = addDays(tasks[4].dueDate, 3);
// tasks[5].project = projects[2].id;
// tasks[5].dueDate = addDays(tasks[5].dueDate, 4);
// tasks[5].completed = true;
// tasks[6].dueDate = addDays(tasks[5].dueDate, 4);
// tasks[6].project = undefined;
// tasks.forEach((tasks) => storageHandler.set(tasks));

const controller = new Controller();
controller.init();