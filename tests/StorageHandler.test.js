import StorageHandler from "../src/modules/StorageHandler.js";
import testUtil from "../src/modules/testUtilities.js";
import util from "../src/modules/utilities.js";

let storageHandler;
let itemArray;

beforeEach(() => {
  // to fully reset the state between tests, clear the storage
  localStorage.clear();
  storageHandler = new StorageHandler();
  itemArray = testUtil.initTaskArray(3).concat(testUtil.initProjectArray(3));
  itemArray.forEach((item) => storageHandler.set(item));
});

describe("Load from storage", () => {
  test("successfully loads data from localStorage", () => {
    let loadStorageHandler = new StorageHandler();
    loadStorageHandler.loadFromStorage();
    let loadedData = loadStorageHandler.getItems();

    expect(util.itemArraysAreEqual(itemArray, loadedData)).toBe(true);
  });
});

describe("Delete object", () => {
  test("deleting object updates localStorage", () => {
    storageHandler.delete(itemArray[0].id);

    // Remove first element of itemArray to match localStorage
    itemArray.splice(0,1);

    // Test whether localStorage is updated
    let loadStorageHandler = new StorageHandler();
    loadStorageHandler.loadFromStorage();
    let loadedData = loadStorageHandler.getItems();

    expect(util.itemArraysAreEqual(itemArray, loadedData)).toBe(true);
  });
});
