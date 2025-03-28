import diamond from "../../images/diamond.svg";
import util from "../utilities/utilities.js";

class sidebarLogoView {
  logoDiv = document.getElementById("logo-container");

render() {
    this.logoDiv.innerHTML = "";
    const diamondSvg = util.htmlToNode(diamond);
    diamondSvg.classList.add("logo");
    this.logoDiv.appendChild(diamondSvg);
  }
}

export default sidebarLogoView;
