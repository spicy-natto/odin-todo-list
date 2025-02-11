import Task from "../src/modules/task";
function initializeTask() {
  return new Task(
    "1",
    "test task",
    "test description",
    "HIGH",
    "01-01-2025",
    "test project"
  );
}

let task;

beforeEach(() => {
  task = initializeTask();
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
      "01-01-2025",
      "test project"
    );  
    expect(task.equals(newTask)).toBe(false);
  });
})
