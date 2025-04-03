import shortUUID from "short-uuid";

class Task {
  static priorities = ["High", "Medium", "Low"];
  objectType = "Task";

  constructor({ id, name, description, priority, dueDate, project, completed }) {
    this.id = id ? id : shortUUID.generate();
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate ? dueDate : new Date(new Date().toDateString());
    this.project = project;
    this.completed = completed ?? false;
  }

  equals(task) {
    return JSON.stringify(this) === JSON.stringify(task);
  }
}

export default Task;
