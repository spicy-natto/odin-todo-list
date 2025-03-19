  import util from "../utilities/utilities.js";
  import Event from "../controller/Event.js";
  
  class SidebarView {
    sidebarList = document.getElementById("sidebar-items");
    SidebarSelectEvent = new Event();
    
    #createDom(sidebarItem) {
        const li = document.createElement("li");
        li.classList.add("sidebar-item");
        li.setAttribute("id", sidebarItem.id);
        li.setAttribute("tabindex", "0");
    
        const icon = util.htmlToNode(sidebarItem.svg);
        icon.classList.add("sidebar-icon");
        li.appendChild(icon);
    
        const label = document.createElement("div");
        label.classList.add("sidebar-label");
        label.textContent = sidebarItem.name;
        li.appendChild(label);

        li.addEventListener("click", this.#triggerEvent(sidebarItem));
    
        return li;
      }

      #triggerEvent(sidebarItem) {
        return () => this.SidebarSelectEvent.trigger(sidebarItem);
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