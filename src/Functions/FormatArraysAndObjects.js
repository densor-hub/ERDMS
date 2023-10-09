export const removeArrayItem = (array, index, numberOfItemstoBeRemoved) => {
  let beforeElement = array.slice(0, index + 1 - numberOfItemstoBeRemoved);

  let afterElement = array.slice(
    index + 1 - numberOfItemstoBeRemoved + 1,
    array.length
  );

  if (array && index && numberOfItemstoBeRemoved) {
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
