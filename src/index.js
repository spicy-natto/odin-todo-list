import "./css/styles.css";
import svgText from "./images/pound.svg";
import ViewHandler from "./modules/view/ViewHandler.js";

console.log(svgText);

const viewHandler = new ViewHandler();
viewHandler.renderSidebar({svg: svgText, name: "Test1"});