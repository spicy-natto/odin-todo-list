import shortUUID from "short-uuid";

class Project {
    #id;
    objectType = "project";

    constructor({id, name, description, priority, dueDate}) {
        this.#id = id ? id : shortUUID.generate();
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
    }

    get id() {
        return this.#id;
    }
}

export default Project;