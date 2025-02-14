class StorageHandler {
    #items
    
    constructor() {
        this.#items = new Map();
    }

    add(item) {
        this.#items.set(item.id, item);
    }

    get(item) {
        return this.#items.get(item.id)
    }

    delete(item) {
        this.#items.delete(item.id);
    }

    getAllItems() {
        return this.#items.values();
    }
}

export default StorageHandler;