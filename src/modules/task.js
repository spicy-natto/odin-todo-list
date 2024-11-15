class Task {
  static currID = 0;
  #id;

  constructor(id, name, description, priority, dueDate) {
    this.#id = id;
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
      JSON.stringify(this) === JSON.stringify(task) &&
      this.id === task.id
    );
  }
}

export default Task;
