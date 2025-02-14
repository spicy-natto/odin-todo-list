import shortUUID from "short-uuid";

class Task {

  #id;

  constructor(name, description, priority, dueDate, project) {
    this.#id = shortUUID.generate();
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.project = project;
  }

  get id() {
    return this.#id;
  }
}

export default Task;
