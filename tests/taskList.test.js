import Task from "../src/modules/task";
import TaskList from "../src/modules/task";

function initializeTask() {
  return new Task(
    "test task",
    "test description",
    "HIGH",
    "01-01-2025",
    "test project"
  );
}

function initTaskList() {
  return new TaskList();
}

let taskList;
let task;

beforeEach(() => {
  taskList = initTaskList();
  task = initializeTask();
});

describe("Add Task", () => {
  test("can get task after adding", () => {
    expect(() => {
      let taskId = taskList.add(task)
      expect(task === taskList.getTask(taskId));
    });
  });
});

describe("Get all tasks", () => {
  test("returns object with all added tasks", () => {
    expect(() => {
      taskList.add(task);
      let task2 = initializeTask();S
      task2.name = "test task 2";
      taskList.add(task2);

      allTaskVals = taskList.getAllTasks().values();

      expect(allTaskVals.includes(task) && allTaskVals.includes(task2));
    });
  });
});