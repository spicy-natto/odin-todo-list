import util from "../utilities/utilities.js";

class ViewHandler {
  sidebarList = document.getElementById("sidebar-items");

  #createSidebarDom({ svg, name }) {
    const li = document.createElement("li");
    li.classList.add("sidebar-item");

    const icon = util.htmlToNode(svg);
    icon.classList.add("sidebar-icon");
    li.appendChild(icon);

    const label = document.createElement("div");
    label.classList.add("sidebar-label");
    label.textContent = name;
    li.appendChild(label);

    console.log(li);
    return li;
  }

  renderSidebar(sidebarItems) {
    sidebarItems.foreach((item) =>
      this.sidebarList.appendChild(this.#createSidebarDom(item)),
    );
  }
}

export default ViewHandler;
