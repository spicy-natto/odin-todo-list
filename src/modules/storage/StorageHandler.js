import ItemCache from "./ItemCache.js";
import ItemStorage from "./ItemStorage.js";
import util from "../utilities/utilities.js"
import Task from "../items/Task.js";
import Project from "../items/Project.js";

class StorageHandler {
  // StorageHandler will save an object containing all Item IDs
  // to LocalStorage when adding / deleting items
  static allItemsStorageId = "ALL_ITEMS";

  // Saves an object consisting only of item IDs to localStorage
  #saveItemsToStorage() {
    localStorage.setItem(
      StorageHandler.allItemsStorageId,
      JSON.stringify(this.itemCache.getItems().map((item) => item.id))
    );
  }

  itemCache = new ItemCache();
  itemStorage = new ItemStorage();

  get(id) {
    return this.itemCache.get(id);
  }

  get items() {
    return this.itemCache.getItems();
  }

  get tasks() {
    return this.itemCache.getItems().filter((item) => item instanceof Task);
  }

  get projects() {
    return this.itemCache.getItems().filter((item) => item instanceof Project);
  }


  set(item) {
    this.itemCache.set(item);
    this.itemStorage.set(item);
    this.#saveItemsToStorage();
  }

  delete(id) {
    this.itemCache.delete(id);
    this.itemStorage.delete(id);
    this.#saveItemsToStorage();
  }

  loadFromStorage() {
    const itemIds = Array.from(
      JSON.parse(localStorage.getItem(StorageHandler.allItemsStorageId))
    );

    if (itemIds) {
      this.itemCache = new ItemCache();
      itemIds.forEach((id) => {
        this.itemCache.set(util.itemFactory(this.itemStorage.get(id)));
      });
    }
  }
}

export default StorageHandler;
