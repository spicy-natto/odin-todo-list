import SidebarView from "./SidebarView.js";
import AddTaskView from "./AddTaskView.js";
import ProjectsView from "./ProjectsView.js";
import TitleView from "./TitleView.js";
import TaskListView from "./TaskListView.js";

class ViewHandler {
  addTask = new AddTaskView();
  sideBar = new SidebarView();
  projects = new ProjectsView();
  title = new TitleView();
  tasks = new TaskListView();
}

export default ViewHandler;
