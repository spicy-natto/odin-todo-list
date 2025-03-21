import Task from "../src/modules/items/Task.js";
import util from "../src/modules/utilities/utilities.js";
import testUtil from "../src/modules/utilities/testUtilities.js";

describe("idMatches", () => {
  test("returns true if items have same ID", () => {
    let task = testUtil.initializeTask();
    let taskClone = new Task(task);

    expect(util.idMatches(task)(taskClone)).toBe(true);
  });
  test("returns false if items have different ID", () => {
    let task = testUtil.initializeTask;
    let task2 = testUtil.initializeTask();

    expect(util.idMatches(task)(task2)).toBe(false);
  });
});

describe("compareItemsById", () => {
  test("first id param is greater than second id param", () => {
    let task1 = testUtil.initializeTask(1, "agasdflkj");
    let task2 = testUtil.initializeTask(2, "bafowiejh");

    expect(util.compareItemsById(task1, task2)).toBeLessThan(0);
  });
  test("first id param is less than second id param", () => {
    let task1 = testUtil.initializeTask(1, "bg4sdflkj");
    let task2 = testUtil.initializeTask(2, "aafow3ejh");

    expect(util.compareItemsById(task1, task2)).toBeGreaterThan(0);
  });
  test("first id param is equal to second id param", () => {
    let task1 = testUtil.initializeTask(1, "fw4i4etkas");
    let task2 = testUtil.initializeTask(2, "fw4i4etkas");

    expect(util.compareItemsById(task1, task2)).toBe(0);
  });
});

describe("itemArraysAreEqual", () => {
  test("Arrays contain different items", () => {
    let array1 = testUtil.initTaskArray(4);
    let array2 = testUtil.initTaskArray(4);

    expect(util.itemArraysAreEqual(array1, array2)).toBe(false);
  });

  test("Arrays are different lengths", () => {
    let longerArray = testUtil.initTaskArray(4);
    longerArray.sort(util.compareItemsById);
    let shorterArray = longerArray.slice(0, -1);

    expect(util.itemArraysAreEqual(shorterArray, longerArray)).toBe(false);
  });

  test("Arrays are the same", () => {
    let array1 = testUtil.initTaskArray(4);
    let array2 = array1.slice();

    expect(util.itemArraysAreEqual(array2, array1)).toBe(true);
  });
});

describe("itemArrayToObject", () => {
  test("Creates object with item IDs as keys and items as values", () => {
    let itemArray = testUtil.initTaskArray(2).concat(testUtil.initProjectArray(2));

    let compareItemsObj = {
      [itemArray[0].id]: itemArray[0],
      [itemArray[1].id]: itemArray[1],
      [itemArray[2].id]: itemArray[2],
      [itemArray[3].id]: itemArray[3],
    }

    expect(util.itemArrayToObject(itemArray)).toEqual(compareItemsObj);
  });
});

