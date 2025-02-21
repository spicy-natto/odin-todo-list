import shortUUID from "short-uuid";

class SidebarItem {
    #id;
    itemType = "sideBarItem";

    constructor({id, name, filterType = "All", filterData}) {
        this.#id = id ? id : shortUUID.generate();
        this.name = name;
        this.filterType = filterType;
        this.filterData = filterData;
    }

    get id() {
        return this.#id;
    }
}

export default SidebarItem;