import Project from "../items/Project.js";
import Task from "../items/Task.js";
import SidebarItem from "../items/SidebarItem.js";

function idMatches(item) {
  return (x) => x.id === item.id;
}

function compareItemsById(a, b) {
  return a.id.localeCompare(b.id);
}

function itemArraysAreEqual(arr1, arr2) {
  arr1.sort(compareItemsById);
  arr2.sort(compareItemsById);
  return (
    arr1.length === arr2.length && arr1.every((e, i) => arr2[i].equals(e))
  );
}

function itemArrayToObject(itemArray) {
  return itemArray.reduce((itemsObj, item) => {
    itemsObj[item.id] = item;
    return itemsObj;
  }, {});
}

function itemFactory(item) {
  if (item.objectType === "Project") return new Project(item);
  if (item.objectType === "Task") return new Task(item);
  if (item.objectType === "SidebarItem") return new SidebarItem(item);
  throw new Error("Object type is not recognized");
}

// Taken from stack overflow 
// https://stackoverflow.com/a/35385518

function htmlToNode(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  const nNodes = template.content.childNodes.length;
  if (nNodes !== 1) {
      throw new Error(
          `html parameter must represent a single node; got ${nNodes}. ` +
          'Note that leading or trailing spaces around an element in your ' +
          'HTML, like " <img/> ", get parsed as text nodes neighbouring ' +
          'the element; call .trim() on your input to avoid this.'
      );
  }
  return template.content.firstChild;
}

export default {
  idMatches,
  compareItemsById,
  itemArraysAreEqual,
  itemArrayToObject,
  htmlToNode,
  itemFactory,
};
