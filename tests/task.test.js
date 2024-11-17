import Task from "../src/modules/task";
function initializeTask() {
  return new Task(
    "1",
    "test task",
    "test description",
    "HIGH",
    "01-01-2025"
  );
}

let task;

beforeEach(() => {
  task = initializeTask();
});

describe("ID", () => {
  test("Throws typeError if you attempt to set it", () => {
    expect(() => {
      task.id = "456";
    }).toThrow(TypeError)
  });
});

describe("equals", () => {
  
  test("is true", () => {
    let newTask = initializeTask();
    expect(task.equals(newTask)).toBe(true);
  });

  test("is false", () => {
    let newTask = new Task(
      "2",
      "not equals task",
      "test description",
      "HIGH",
      "01-01-2025"
    );  
    expect(task.equals(newTask)).toBe(false);
  });
})
