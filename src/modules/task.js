class Task {
  static currID = 0;
  #id;

  constructor(name, description, priority, dueDate) {
    Task.currID++;
    this.#id = Task.currID;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
  }

  get id() {
    return this.#id;
  }

  equals(task) {
    return (
      this.name === task.name &&
      this.description === task.description &&
      this.priority === task.priority &&
      this.dueDate === task.dueDate
    );
  }
}

export default Task;
