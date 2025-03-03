import ItemCache from "../src/modules/ItemCache.js";
import testUtil from "../src/modules/testUtilities.js";
import util from "../src/modules/utilities.js";

let itemCache;
let itemArray;
let task;

beforeEach(() => {
  itemCache = new ItemCache();
  itemArray = testUtil.initTaskArray(3).concat(testUtil.initProjectArray(3));
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
    itemArray.splice(0, 1);

    expect(util.itemArraysAreEqual(itemArray, allItemsAfterDelete)).toBe(true);
  });
});
