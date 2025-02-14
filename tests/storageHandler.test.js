import Task from "../src/modules/Task";
import StorageHandler from "../src/modules/StorageHandler";

function initializeTask() {
  return new Task(
    "test task",
    "test description",
    "HIGH",
    "01-01-2025",
    "test project"
  );
}

function initStorageHandler() {
  return new StorageHandler();
}

let storageHandler;
let task;

beforeEach(() => {
  storageHandler = initStorageHandler();
  task = initializeTask();
});

describe("Add item", () => {
  test("can get item by ID after adding", () => {
    storageHandler.add(task);
    expect(storageHandler.get(task).id === task.id).toBe(true);
  });
});

describe("getItems", () => {
  test("returns collection of all added items", () => {
    storageHandler.add(task);
    let task2 = initializeTask();
    task2.name = "test task 2";
    storageHandler.add(task2);

    let allItems = Array.from(storageHandler.getAllItems());

    const isItem = (item) => (x) => x.id === item.id;

    expect(
      !!(allItems.find(isItem(task)) && allItems.find(isItem(task2)))
    ).toBe(true);
  });
});

describe("Delete item", () => {
  test("removes item from storage handler", () => {
    storageHandler.add(task);
    let task2 = initializeTask();
    task2.name = "test task 2";
    storageHandler.add(task2);

    storageHandler.delete(task2);

    let allItems = Array.from(storageHandler.getAllItems());

    const isItem = (item) => (x) => x.id === item.id;

    expect(
      !!(allItems.find(isItem(task)) && !allItems.find(isItem(task2)))
    ).toBe(true);
  });
});
