import { iFormDataObject } from "../Interfaces/Interfaces";

export const addToFormData = (
  existingFormData: iFormDataObject[],
  dataToBeAdded: iFormDataObject[],
  startIndex: number
) => {
  if (startIndex > existingFormData.length - 1) {
    throw new Error(
      "StrartIndex cannot be greater than length of existing form data"
    );
  }

  let beforeStartIndex: iFormDataObject[] = existingFormData.slice(
    0,
    startIndex
  );
  let afterStartIndex: iFormDataObject[] = existingFormData.slice(startIndex);

  var duplicateExists: iFormDataObject[] = [];
  dataToBeAdded.forEach((data) => {
    return existingFormData.find((existingData) => {
      if (
        existingData.label.toLowerCase()?.trim() ===
        data.label?.toLowerCase()?.trim()
      ) {
        duplicateExists.push(data);
      }
    });
  });

  if (duplicateExists.length > 0) {
    let duplicateLabels: string = "";
    for (var i = 0; i < duplicateExists.length; i++) {
      duplicateLabels = duplicateLabels + duplicateExists[i].label + " , ";
    }
    throw new Error(
      `Duplicate labels ${duplicateLabels} found. Submit unique label for each formData entry`
    );
  }

  return [...beforeStartIndex, ...dataToBeAdded, ...afterStartIndex];
};

//[1,2,3,4,5]
