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
  taskArray.push(task);
  let task2 = initializeTask();
  taskArray.push(task2);
  task2.name = "test task 2";
  let task3 = initializeTask();
  taskArray.push(task3);
  task3.name = "test task 3";

  taskArray.forEach((item) => storageHandler.set(item));
});

describe("Load from storage", () => {
  test("successfully loads data from localStorage", () => {
    let loadStorageHandler = new StorageHandler();
    loadStorageHandler.loadFromStorage();
    let loadedData = loadStorageHandler.getItems();

    taskArray.sort(compareItems);
    loadedData.sort(compareItems);

    expect(JSON.stringify(taskArray)).toEqual(JSON.stringify(loadedData));
  });
});

describe("Delete object", () => {
  test("deleting object updates localStorage", () => {
    storageHandler.delete(task.id);
    let oldStorageData = storageHandler.getItems();

    let loadStorageHandler = new StorageHandler();
    loadStorageHandler.loadFromStorage();
    let loadedData = loadStorageHandler.getItems();

    oldStorageData.sort(compareItems);
    loadedData.sort(compareItems);

    expect(JSON.stringify(oldStorageData)).toEqual(JSON.stringify(loadedData));
  });
});
