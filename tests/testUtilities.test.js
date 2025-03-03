import Task from "../src/modules/items/Task.js";
import util from "../src/modules/utilities/utilities.js";
import testUtil from "../src/modules/utilities/testUtilities.js";
import Project from "../src/modules/items/Project.js";

describe("initializeTask", () => {
  test("task is initialized without itemId parameter", () => {
    let task = testUtil.initializeTask(2);

    let compareTask = new Task({
      id: task.id,
      name: "test task 2",
      description: "test task description 2",
      priority: "HIGH",
      dueDate: new Date(new Date().toDateString()),
      project: "test project",
    });

    expect(task.id).toEqual(compareTask.id);
    expect(task).toEqual(compareTask);
  });
  test("task is initialized with itemId parameter", () => {
    let task = testUtil.initializeTask(2);
    let compareTask = testUtil.initializeTask(2, task.id);

    expect(task.id).toEqual(compareTask.id);
    expect(task).toEqual(compareTask);
  });
});

describe("initializeProject", () => {
  test("project is initialized without itemId parameter", () => {
    let project = testUtil.initializeProject(2);

    let compareProject = new Project({
      id: project.id,
      name: "test project 2",
      description: "test project description 2",
      priority: "HIGH",
      dueDate: new Date(new Date().toDateString()),
    });

    expect(project.id).toEqual(compareProject.id);
    expect(project).toEqual(compareProject);
  });
  test("project is initialized with itemId parameter", () => {
    let project = testUtil.initializeProject(2);
    let compareProject = testUtil.initializeProject(2, project.id);

    expect(project.id).toEqual(compareProject.id);
    expect(project).toEqual(compareProject);
  });
});

describe("initTaskArray", () => {
  test("taskArray is created with n tasks", () => {
    let taskArray = testUtil.initTaskArray(3);

    let compareTaskArray = [];
    let task1 = testUtil.initializeTask(1, taskArray[0].id);
    let task2 = testUtil.initializeTask(2, taskArray[1].id);
    let task3 = testUtil.initializeTask(3, taskArray[2].id);
    compareTaskArray.push(task1)
    compareTaskArray.push(task2);
    compareTaskArray.push(task3);

    expect(util.itemArraysAreEqual(taskArray, compareTaskArray));
  });
});

describe("initProjectArray", () => {
    test("projectArray is created with n tasks", () => {
      let projectArray = testUtil.initProjectArray(3);
  
      let compareProjectArray = [];
      let task1 = testUtil.initializeProject(1, projectArray[0].id);
      let task2 = testUtil.initializeProject(2, projectArray[1].id);
      let task3 = testUtil.initializeProject(3, projectArray[2].id);
      compareProjectArray.push(task1)
      compareProjectArray.push(task2);
      compareProjectArray.push(task3);
  
      expect(util.itemArraysAreEqual(projectArray, compareProjectArray));
    })
});
