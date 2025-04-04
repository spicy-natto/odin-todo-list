import { isAfter, isBefore, subDays, addDays } from "date-fns";
import util from "../utilities/utilities.js";
import Project from "../items/Project.js";
import SidebarItem from "../items/SidebarItem.js";
import inbox from "../../images/inbox-full-outline.svg";
import today from "../../images/calendar-today.svg";
import upcoming from "../../images/calendar-month-outline.svg";
import completed from "../../images/check-circle-outline.svg";

class UiStateHandler {
  static sidebarItems = [
    new SidebarItem({
      name: "Inbox",
      svg: inbox,
      filterType: "noProject",
    }),
    new SidebarItem({
      name: "Today",
      svg: today,
      filterType: "dateLessThanOrEqual",
      filterData: new Date(new Date().toDateString()),
    }),
    new SidebarItem({
      name: "Upcoming",
      svg: upcoming,
      filterType: "dateEqualOrGreater",
      filterData: addDays(new Date(new Date().toDateString()), 1),
    }),
    new SidebarItem({
      name: "Completed",
      svg: completed,
      filterType: "completed",
      filterData: addDays(new Date(new Date().toDateString()), 1),
    }),
  ];

  constructor() {
    this.setDefaultFilter();
  }

  #createFilterFun(item) {
    let filterType = item instanceof Project ? "project" : item.filterType;
    switch (filterType) {
      case "project":
        return (task) => task.project === item.id && !task.completed;
      case "dateEqualOrGreater":
        return (task) =>
          isAfter(task.dueDate, subDays(item.filterData, 1)) && !task.completed;
      case "dateLessThanOrEqual":
        return (task) =>
          isBefore(task.dueDate, addDays(item.filterData, 1)) && !task.completed;
      case "completed":
        return (task) => task.completed;
      case "noProject":
        return (task) => {
          return !task.project && !task.completed;
        };
      default:
        // return all values
        return (task) => task;
    }
  }

  createTaskViewData(projects, tasks) {
    const projectsObj = util.itemArrayToObject(projects);
    const projectsFromTasks = {};
    const filteredTasks = tasks.filter(this.#createFilterFun(this.filter));
    filteredTasks.forEach(
      (task) => (projectsFromTasks[task.project] = projectsObj[task.project]),
    );

    return {
      projects: projectsFromTasks,
      tasks: filteredTasks,
    };
  }

  setDefaultFilter() {
    this.filter = UiStateHandler.sidebarItems.find(
      (sideBarItem) => sideBarItem.name === "Today",
    );
  }
}

export default UiStateHandler;
