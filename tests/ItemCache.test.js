import Task from "../src/modules/Task";
import ItemCache from "../src/modules/ItemCache";

function initializeTask() {
  return new Task(
    "test task",
    "test description",
    "HIGH",
    "01-01-2025",
    "test project"
  );
}

function initItemCache() {
  return new ItemCache();
}

let itemCache;
let task;

beforeEach(() => {
  itemCache = initItemCache();
  task = initializeTask();
});

describe("Add item", () => {
  test("can get item by ID after adding", () => {
    itemCache.add(task);
    expect(itemCache.get(task).id === task.id).toBe(true);
  });
});

describe("getItems", () => {
  test("returns collection of all added items", () => {
    itemCache.add(task);
    let task2 = initializeTask();
    task2.name = "test task 2";
    itemCache.add(task2);

    let allItems = Array.from(itemCache.getItems());

    const isItem = (item) => (x) => x.id === item.id;

    expect(
      !!(allItems.find(isItem(task)) && allItems.find(isItem(task2)))
    ).toBe(true);
  });
});

describe("Delete item", () => {
  test("removes item from storage handler", () => {
    itemCache.add(task);
    let task2 = initializeTask();
    task2.name = "test task 2";
    itemCache.add(task2);

    itemCache.delete(task2);

    let allItems = Array.from(itemCache.getItems());

    const isItem = (item) => (x) => x.id === item.id;

    expect(
      !!(allItems.find(isItem(task)) && !allItems.find(isItem(task2)))
    ).toBe(true);
  });
});
