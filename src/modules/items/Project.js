import shortUUID from "short-uuid";

class Project {
    objectType = "Project";

    constructor({id, name, description}) {
        this.id = id ? id : shortUUID.generate();
        this.name = name;
        this.description = description;
    }

    equals(project) {
        return JSON.stringify(this) === JSON.stringify(project);
    }
}

export default Project;