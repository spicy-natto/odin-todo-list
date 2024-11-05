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
}

export default Task;