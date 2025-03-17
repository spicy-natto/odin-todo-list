import shortUUID from "short-uuid";

class Project {
    objectType = "project";

    constructor({id, name, description, priority, dueDate}) {
        this.id = id ? id : shortUUID.generate();
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
    }

    equals(project) {
        return JSON.stringify(this) === JSON.stringify(project);
    }
}

export default Project;