export const removeArrayItem = (array: Array<any>, index: number) => {
  if (index < 0 || index > array.length) {
    throw new Error("Index is out of range");
  } else {
    let beforeElement = array.slice(0, Number(index));

    let afterElement = array.slice(Number(index) + 1, array.length);

    if (array && index) {
      return [...beforeElement, ...afterElement];
    } else {
      return array;
    }
  }
};

export const insertArrayItem = (
  array: Array<any>,
  arrayItem: any,
  index: number
) => {
  if (index < 0 || index > array.length) {
    throw new Error("Index is out of range");
  } else {
    let beforeElement = array.slice(0, index);

    let afterElement = array.slice(index);

    if (
      array?.findIndex((i) => {
        return (
          i?.label?.trim()?.toLowerCase() ===
          arrayItem?.label.trim()?.toLowerCase()
        );
      }) === -1
    ) {
      return [...beforeElement, arrayItem, ...afterElement];
    } else {
      return array;
    }
  }
};
