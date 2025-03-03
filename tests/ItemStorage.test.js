import ItemStorage from "../src/modules/ItemStorage.js";
import testUtil from "../src/modules/testUtilities.js";

let itemStorage;
let task;

beforeEach(() => {
// to fully reset the state between tests, clear the storage
  localStorage.clear();
  itemStorage = new ItemStorage();
  task = testUtil.initializeTask();
});

describe("Add item", () => {
  test("can get item by ID from localStorage after adding", () => {
    itemStorage.set(task);
    expect(itemStorage.get(task.id).id === task.id).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
});


describe("Delete item", () => {
    test("Item is removed successfully", () => {
      itemStorage.set(task);
      let task2 = testUtil.initializeTask(2);
      itemStorage.set(task2);

      itemStorage.delete(task.id);

      expect(itemStorage.get(task.id)).toBe(null);
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
      expect(localStorage.removeItem).toHaveBeenCalled();
    });
  });