import Task from "../src/modules/task";

describe("Task ID", () => {
  const task = new Task(
    "test task",
    "test description",
    "HIGH",
    "01-01-2025"
  );
  
  test("Should return initial value", () => {
    expect(task.id).toEqual(1);
  });

  test("Should throw typeError if you attempt to set it", () => {
    try {
      task.id = "456";
    } catch (e) {
      expect(e.name).toEqual("TypeError");
      expect(e.message).toEqual(
        "Cannot set property id of #<Task> which has only a getter"
      );
    }
  });
});
