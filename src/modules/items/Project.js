import shortUUID from "short-uuid";

class Project {
    objectType = "Project";

    constructor({id, name}) {
        this.id = id ? id : shortUUID.generate();
        this.name = name;
    }

    equals(project) {
        return JSON.stringify(this) === JSON.stringify(project);
    }
}

export default Project;