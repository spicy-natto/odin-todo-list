import Project from "../items/Project";
import Task from "../items/Task";

function initializeTask(n = 1, itemId) {
  return new Task({
    id: itemId,
    name: `test task ${n}`,
    description: `test task description ${n}`,
    priority: "HIGH",
    dueDate: new Date(new Date().toDateString()),
    project: "test project",
  });
}

function initializeProject(n = 1, itemId) {
  return new Project({
    id: itemId,
    name: `test project ${n}`,
    description: `test project description ${n}`,
    priority: "HIGH",
    dueDate: new Date(new Date().toDateString()),
  });
}

// Create array of items using an initialization function.
const initItemArray = (initCallback) => (numberOfTasks) => {
  return Array.from({ length: numberOfTasks }, (e, i) => initCallback(i));
};

const initTaskArray = initItemArray(initializeTask);
const initProjectArray = initItemArray(initializeProject);

export default {
  initializeTask,
  initializeProject,
  initItemArray,
  initTaskArray,
  initProjectArray,
};
