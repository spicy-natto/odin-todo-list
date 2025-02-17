import Task from "../src/modules/Task";
import StorageHandler from "../src/modules/StorageHandler";

function initializeTask() {
    return new Task({
      name: "test task",
      description: "test description",
      priority: "HIGH",
      dueDate: "01-01-2025",
      project: "test project",
    });
  }

function compareItems(a, b) {
    return a.id - b.id;
}

let storageHandler;
let taskArray;
let task;

beforeEach(() => {
// to fully reset the state between tests, clear the storage
  localStorage.clear();
  storageHandler = new StorageHandler();

  // Add test data to storageHandler
  taskArray = [];
  task = initializeTask();
  taskArray.push = task;
  let task2 = initializeTask();
  task2.name = "test task 2";
  let task3 = initializeTask();
  task3.name = "test task 3";

  taskArray.forEach(item => storageHandler.set(item));
});

describe("Load from storage", () => {
  test("successfully loads data from localStorage", () => {

    let loadStorageHandler = new StorageHandler();
    loadStorageHandler.loadFromStorage();
    let loadedData = loadStorageHandler.getItems();

    taskArray.sort(compareItems);
    loadedData.sort(compareItems);

    expect(JSON.stringify(taskArray)).toEqual(JSON.stringify(loadedData));
  })
});