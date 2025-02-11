class Task {

  constructor(name, description, priority, dueDate, project) {
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.project = project;
  }

  equals(task) {
    return (
      JSON.stringify(this) === JSON.stringify(task)
    );
  }
}

export default Task;
