import "./css/styles.css";
import svgText from "./images/pound.svg";
import UiStateHandler from "./modules/state/UiStateHandler.js";
import ViewHandler from "./modules/view/ViewHandler.js";

console.log(svgText);

const viewHandler = new ViewHandler();
console.log(UiStateHandler.sideBarItems);
viewHandler.renderSidebar(UiStateHandler.sideBarItems);
viewHandler.renderAddTask();