import shortUUID from "short-uuid";

class SidebarItem {
    itemType = "SidebarItem";

    constructor({id, name, filterType = "All", filterData, svg}) {
        this.id = id ? id : shortUUID.generate();
        this.svg = svg;
        this.name = name;
        this.filterType = filterType;
        this.filterData = filterData;
    }
}

export default SidebarItem;