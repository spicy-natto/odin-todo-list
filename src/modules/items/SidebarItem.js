import shortUUID from "short-uuid";

class SidebarItem {
    objectType = "SidebarItem";

    constructor({id, name, filterType = "All", filterData, svg}) {
        this.id = id ? id : shortUUID.generate();
        this.svg = svg;
        this.name = name;
        this.filterType = filterType;
        this.filterData = filterData;
    }

    equals(sideBarItem) {
        return JSON.stringify(this) === JSON.stringify(sideBarItem);
    }
}

export default SidebarItem;