import shortUUID from "short-uuid";

class Task {
  #id;
  objectType = "task";

  constructor({ id, name, description, priority, dueDate, project, completed }) {
    this.#id = id ? id : shortUUID.generate();
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.project = project;
    this.completed = completed ? completed : false;
  }

  get id() {
    return this.#id;
  }

}

export default Task;
