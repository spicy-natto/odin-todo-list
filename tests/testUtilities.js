import Project from "../src/modules/Project";
import Task from "../src/modules/Task";

function initializeTask(n = 1) {
  return new Task({
    name: `test task ${n}`,
    description: `test task decription ${n}`,
    priority: "HIGH",
    dueDate: "01-01-2025",
    project: "test project",
  });
}

function initializeProject(n = 1) {
  return new Project({
    name: `test project ${n}`,
    description: `test project description ${n}`,
    priority: "HIGH",
    dueDate: "01-01-2025",
  });
}

// Create array of items using an initialization function.
const initItemArray = (initCallback) => (numberOfTasks) => {
  return Array.from({ length: numberOfTasks }, (e, i) => initCallback(i));
};

const initTaskArray = initItemArray(initializeTask);
const initProjectArray = initItemArray(initializeProject);

function idMatches(item) {
  return (x) => x.id === item.id;
}

function compareItems(a, b) {
  return a.id - b.id;
}

function itemArraysAreEqual(arr1, arr2) {
  arr1.sort(compareItems);
  arr2.sort(compareItems);
  return (
    arr1.length === arr2.length && arr1.every((e, i) => arr2[i].id === e.id)
  );
}

export default {
  initializeTask,
  initializeProject,
  initItemArray,
  idMatches,
  compareItems,
  initTaskArray,
  initProjectArray,
  itemArraysAreEqual,
};
