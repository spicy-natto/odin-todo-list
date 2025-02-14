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
const idMatches = (item) => (x) => x.id === item.id;

beforeEach(() => {
  itemCache = initItemCache();
  task = initializeTask();
});

describe("Add item", () => {
  test("can get item by ID after adding", () => {
    itemCache.set(task);
    expect(itemCache.get(task.id).id === task.id).toBe(true);
  });
});

describe("getItems", () => {
  test("returns collection of all added items", () => {
    itemCache.set(task);
    let task2 = initializeTask();
    task2.name = "test task 2";
    itemCache.set(task2);

    let allItems = itemCache.getItems();

    expect(
      !!(allItems.find(idMatches(task)) && allItems.find(idMatches(task2)))
    ).toBe(true);
  });
});

describe("Delete item", () => {
  test("removes item from storage handler", () => {
    itemCache.set(task);
    let task2 = initializeTask();
    task2.name = "test task 2";
    itemCache.set(task2);

    itemCache.delete(task2);

    let allItems = itemCache.getItems();

    expect(
      !!(allItems.find(idMatches(task)) && !allItems.find(idMatches(task2)))
    ).toBe(true);
  });
});
