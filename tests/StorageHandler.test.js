import StorageHandler from "../src/modules/storage/StorageHandler.js";
import testUtil from "../src/modules/utilities/testUtilities.js";
import util from "../src/modules/utilities/utilities.js";

let storageHandler;
let itemArray;
let taskArray;
let projectArray;

beforeEach(() => {
  // to fully reset the state between tests, clear the storage
  localStorage.clear();
  storageHandler = new StorageHandler();
  taskArray = testUtil.initTaskArray(3);
  projectArray = testUtil.initProjectArray(3);
  itemArray = taskArray.concat(projectArray);
  itemArray.forEach((item) => storageHandler.set(item));
});

describe("Load from storage", () => {
  test("successfully loads data from localStorage", () => {
    const loadStorageHandler = new StorageHandler();
    loadStorageHandler.loadFromStorage();
    const loadedData = loadStorageHandler.items;

    expect(util.itemArraysAreEqual(itemArray, loadedData)).toBe(true);
  });
});

describe("Delete object", () => {
  test("deleting object updates localStorage", () => {
    storageHandler.delete(itemArray[0].id);

    // Remove first element of itemArray to match localStorage
    itemArray.splice(0,1);

    // Test whether localStorage is updated
    const loadStorageHandler = new StorageHandler();
    loadStorageHandler.loadFromStorage();
    const loadedData = loadStorageHandler.items;

    expect(util.itemArraysAreEqual(itemArray, loadedData)).toBe(true);
  });
});

  describe("getters / setters", () => {
    test("get tasks works", () => {

      const loadStorageHandler = new StorageHandler();
      loadStorageHandler.loadFromStorage();
      const tasks = loadStorageHandler.tasks;
  
      expect(util.itemArraysAreEqual(taskArray, tasks)).toBe(true);
    });

    test("get projects works", () => {

      const loadStorageHandler = new StorageHandler();
      loadStorageHandler.loadFromStorage();
      const projects = loadStorageHandler.projects;
  
      expect(util.itemArraysAreEqual(projectArray, projects)).toBe(true);
    });
});
