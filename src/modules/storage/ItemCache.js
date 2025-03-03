class ItemCache {
    #items
    
    constructor() {
        this.#items = new Map();
    }

    set(item) {
        this.#items.set(item.id, item);
    }

    get(id) {
        return this.#items.get(id);
    }

    delete(id) {
        this.#items.delete(id);
    }
    
    getItems() {
        return Array.from(this.#items.values());
    }
}

export default ItemCache;