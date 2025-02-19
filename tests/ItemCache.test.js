import Task from "../src/modules/Task";
import ItemCache from "../src/modules/ItemCache";
import util from "./testUtilities";

let itemCache;
let itemArray;
let task;

beforeEach(() => {
  itemCache = new ItemCache();
  itemArray = util.initTaskArray(3).concat(util.initProjectArray(3));
  task = itemArray[0];
  itemArray.forEach((item) => itemCache.set(item));
});

describe("set", () => {
  test("can get item by ID after adding", () => {
    itemCache.set(task);
    expect(itemCache.get(task.id).id === task.id).toBe(true);
  });
});

describe("getItems", () => {
  test("returns collection of all added items", () => {
    let allItems = itemCache.getItems();
    expect(util.itemArraysAreEqual(itemArray, allItems)).toBe(true);
  });
});

describe("delete", () => {
  test("removes item from itemCache", () => {
    itemCache.delete(itemArray[0].id);
    let allItemsAfterDelete = itemCache.getItems();

    // Remove first element from itemArray so that it will match cache
    // after deleting first Task from cache
    itemArray.splice(0,1)

    expect(util.itemArraysAreEqual(itemArray, allItemsAfterDelete)).toBe(
      true
    );
  });
});
