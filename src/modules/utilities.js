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
    arr1.length === arr2.length && arr1.every((e, i) => arr2[i].id === e.id)
  );
}

export default {
  idMatches,
  compareItemsById,
  itemArraysAreEqual,
};
