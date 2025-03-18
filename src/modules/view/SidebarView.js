  import util from "../utilities/utilities.js";
  
  class SidebarView {
    sidebarList = document.getElementById("sidebar-items");
    
    #createDom({ svg, name, id }) {
        const li = document.createElement("li");
        li.classList.add("sidebar-item");
        li.setAttribute("id", id);
    
        const icon = util.htmlToNode(svg);
        icon.classList.add("sidebar-icon");
        li.appendChild(icon);
    
        const label = document.createElement("div");
        label.classList.add("sidebar-label");
        label.textContent = name;
        li.appendChild(label);
    
        return li;
      }
    
      render(sidebarItems) {
        this.sidebarList.innerHTML = "";
        sidebarItems.forEach((item) =>
          this.sidebarList.appendChild(this.#createDom(item)),
        );
      }

      deselect() {
        const sidebarItemsDom = Array.from(this.sidebarList.getElementsByClassName("sidebar-item"));
        sidebarItemsDom.forEach((item) => item.classList.remove("sidebar-selected"));
      }

      select(sidebarItem) {
        const sidebarItemDom = document.getElementById(sidebarItem.id);
        sidebarItemDom.classList.add("sidebar-selected");
      }
  }

  export default SidebarView;