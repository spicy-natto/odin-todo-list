import { isAfter, isEqual, subDays, addDays } from "date-fns";
import util from "../utilities/utilities.js";
import Project from "../items/Project.js";
import SidebarItem from "../items/SidebarItem.js";
import inbox from "../../images/inbox-full-outline.svg";
import today from "../../images/calendar-today.svg";
import upcoming from "../../images/calendar-month-outline.svg";

console.log(typeof inbox);

class UiStateHandler {
  static sideBarItems = [
    new SidebarItem({
      name: "Inbox",
      svg: inbox,
      filterType: "all",
    }),
    new SidebarItem({
      name: "Today",
      svg: today,
      filterType: "dateEqual",
      filterData: addDays(new Date(new Date().toDateString()), 1),
    }),
    new SidebarItem({
      name: "Upcoming",
      svg: upcoming,
      filterType: "dateEqualOrGreater",
      filterData: addDays(new Date(new Date().toDateString()), 1),
    }),
  ];

  filter;
  
  #createFilterFun(item) {
    let filterType = item instanceof Project ? "project" : item.filterType;
    switch (filterType) {
      case "project":
        return (task) => task.project === item.id;
      case "dateEqualOrGreater":
        return (task) => isAfter(task.dueDate, subDays(item.filterData, 1));
      case "dateEqual":
        return (task) => isEqual(task.dueDate, item.filterData);
      case "completed":
        return (task) => task.completed === true;
      default:
        // return all values
        return (task) => task;
    }
  }

  createTaskViewData(projects, tasks) {
    let projectsObj = util.itemArrayToObject(projects);
    let projectsFromTasks = {};
    let filteredTasks = tasks.filter(this.#createFilterFun(this.filter));
    filteredTasks.forEach(
      (task) => (projectsFromTasks[task.project] = projectsObj[task.project]),
    );

    return {
      projects: projectsFromTasks,
      tasks: filteredTasks,
    };
  }

  createSidebarData(projects) {
    return {
      sideBarItems: UiStateHandler.sideBarItems,
      projects: projects,
    };
  }
}

export default UiStateHandler;
