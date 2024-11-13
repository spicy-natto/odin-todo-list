import Task from "../src/modules/task";

describe("Task ID", () => {
  const task = new Task(
    "test task",
    "test description",
    "HIGH",
    "01-01-2025"
  );

  test("Throws typeError if you attempt to set it", () => {
    expect(() => {
      task.id = "456";
    }).toThrow(TypeError)
  });
});
