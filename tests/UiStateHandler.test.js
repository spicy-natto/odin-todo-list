import testUtil from "../src/modules/utilities/testUtilities.js";
import { addDays } from "date-fns";
import UiStateHandler from "../src/modules/state/UiStateHandler.js";
import SidebarItem from "../src/modules/items/SidebarItem.js";
import util from "../src/modules/utilities/utilities.js";

let uiState;
let projects;
let tasks;

beforeEach(() => {
  // to fully reset the state between tests, clear the storage
  localStorage.clear();
  uiState = new UiStateHandler();

  //projects[3] is unused by tasks
  projects = testUtil.initProjectArray(4);

  projects[0].dueDate = addDays(projects[0].dueDate, -1);
  projects[2].dueDate = addDays(projects[2].dueDate, 2);

  tasks = testUtil.initTaskArray(6);
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
});

describe("CreateTaskViewData", () => {
  test("Creates Task data based on 'project' filter", () => {
    uiState.filter = projects[0];
    let taskViewData = {
      projects: util.itemArrayToObject([projects[0]]),
      tasks: tasks.slice(0, 2),
    };
    expect(uiState.createTaskViewData(projects, tasks)).toEqual(taskViewData);
  });

  test("Creates Task data based on 'dateEqualOrGreater' filter", () => {
    uiState.filter = new SidebarItem({
      name: "Upcoming",
      filterType: "dateEqualOrGreater",
      filterData: addDays(new Date(new Date().toDateString()), 1),
    });

    let taskViewData = {
      projects: util.itemArrayToObject(projects.slice(1,-1)),
      tasks: tasks.slice(2),
    };
    expect(uiState.createTaskViewData(projects, tasks)).toEqual(taskViewData);
  });

  test("Creates Task data based on 'dateEquals' filter", () => {
    uiState.filter = new SidebarItem({
      name: "Today",
      filterType: "dateEqual",
      filterData: addDays(new Date(new Date().toDateString()), 1),
    });

    let taskViewData = {
      projects: util.itemArrayToObject([projects[1]]),
      tasks: [tasks[2]],
    };

    expect(uiState.createTaskViewData(projects, tasks)).toEqual(taskViewData);
  });
  test("Creates Task data based on 'all' filter", () => {
    uiState.filter = new SidebarItem({
      name: "Inbox",
      filterType: "all",
    });

    let taskViewData = {
      // Remove unused project from array
      projects: util.itemArrayToObject(projects.slice(0, -1)),
      tasks: [...tasks],
    };

    expect(uiState.createTaskViewData(projects, tasks)).toEqual(taskViewData);
  });
  test("Creates Task data based on 'completed' filter", () => {
    uiState.filter = new SidebarItem({
      name: "Completed",
      filterType: "completed",
    });

    tasks[3].completed = true;
    tasks[4].completed = true;

    let taskViewData = {
      // Remove unused project from array
      projects: util.itemArrayToObject([projects[1], projects[2]]),
      tasks: [tasks[3], tasks[4]],
    };

    expect(uiState.createTaskViewData(projects, tasks)).toEqual(taskViewData);
  });
  test("Creates Task data based on 'all' if filterType of filter object is not recognized", () => {
    uiState.filter = new SidebarItem({
      name: "Invalid",
      filterType: "undefined",
    });

    let taskViewData = {
      // Remove unused project from array
      projects: util.itemArrayToObject(projects.slice(0, -1)),
      tasks: [...tasks],
    };

    expect(uiState.createTaskViewData(projects, tasks)).toEqual(taskViewData);
  });
});

