export const removeArrayItem = (array, arrayItem) => {
  let beforeElement = array.slice(0, array.indexOf(arrayItem));

  let afterElement = array.slice(array.indexOf(arrayItem) + 1, array.length);
  if (arrayItem) {
    return [...beforeElement, ...afterElement];
  } else {
    return [...array];
  }
};

export const insertArrayItem = (array, arrayItem, index) => {
  let beforeElement = array.slice(0, index);

  let afterElement = array.slice(index, array.length);

  if (
    !array?.find((i) => {
      return (
        i?.label?.trim()?.toLowerCase() ===
        arrayItem?.label?.trim()?.toLowerCase()
      );
    }) ||
    array?.find((i) => {
      return (
        i.label?.trim()?.toLowerCase() ===
        arrayItem?.label.trim()?.toLowerCase()
      );
    }) === undefined
  ) {
    return [...beforeElement, arrayItem, ...afterElement];
  } else {
    return [...array];
  }
};
