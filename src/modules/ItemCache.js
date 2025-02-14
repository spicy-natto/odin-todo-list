class ItemCache {
    #items
    
    constructor() {
        this.#items = new Map();
    }

    set(item) {
        this.#items.set(item.id, item);
    }

    get(id) {
        return this.#items.get(id)
    }

    delete(item) {
        this.#items.delete(item.id);
    }

    getItems() {
        return Array.from(this.#items.values());
    }
}

export default ItemCache;