class ItemStorage {
  set(item) {
    // Append id field since #id is not enumerable
    localStorage.setItem(item.id, JSON.stringify({...item, id: item.id}));
  }

  get(id) {
    return JSON.parse(localStorage.getItem(id));
  }

  delete(id) {
    localStorage.removeItem(id);
  }
}

export default ItemStorage;
