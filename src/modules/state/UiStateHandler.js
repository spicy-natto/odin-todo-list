import { isAfter, isEqual, subDays, addDays } from "date-fns";
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
      filterType: "dateEqual",
      filterData: addDays(new Date(new Date().toDateString()), 1),
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

  filter = UiStateHandler.sidebarItems.find(
    (sideBarItem) => sideBarItem.name === "Today",
  );

  #createFilterFun(item) {
    let filterType = item instanceof Project ? "project" : item.filterType;
    switch (filterType) {
      case "project":
        return (task) => task.project === item.id && !task.completed;
      case "dateEqualOrGreater":
        return (task) =>
          isAfter(task.dueDate, subDays(item.filterData, 1)) && !task.completed;
      case "dateEqual":
        return (task) =>
          isEqual(task.dueDate, item.filterData) && !task.completed;
      case "completed":
        return (task) => task.completed;
      case "noProject":
        return (task) => {
          console.log(task.name + " " + task.project);
          return !task.project;
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
}

export default UiStateHandler;
