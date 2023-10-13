const durationValidator = (
  startDate: Intl.DateTimeFormatPartTypes,
  endDate: Intl.DateTimeFormatPartTypes,
  startDateRef: React.RefObject<string>,
  endDateRef: React.RefObject<string>,
  setFeedback: Function,
  setFieldColor: Function,
  FuctionToRunWhenDurationIsValid: Function,
  selectedEmployeeId: string | number
) => {
  let startYear = startDate.split("-")[0];
  let startMonth = startDate.split("-")[1];
  let startDay = startDate.split("-")[2];

  let endYear = endDate.split("-")[0];
  let endMonth = endDate.split("-")[1];
  let endDay = endDate.split("-")[2];

  if (startYear === endYear) {
    if (startMonth === endMonth) {
      if (startDay > endDay) {
        setFeedback("End-date must be same or ahead of Start-date");
        setFieldColor([endDateRef.current, startDateRef.current], "red");
      } else {
        FuctionToRunWhenDurationIsValid(selectedEmployeeId);
      }
    } else if (!(startMonth === endMonth)) {
      if (endMonth > startMonth) {
        FuctionToRunWhenDurationIsValid(selectedEmployeeId);
      } else if (startMonth > endMonth) {
        setFeedback("End-date must be same or ahead of Start-date");
        setFieldColor([endDateRef.current, startDateRef.current], "red");
      }
    }
  } else if (!(startYear === endYear)) {
    if (endYear > startYear) {
      FuctionToRunWhenDurationIsValid(selectedEmployeeId);
    } else if (startYear > endYear) {
      setFeedback("End-date must be same or ahead of Start-date");
      setFieldColor([endDateRef.current, startDateRef.current], "red");
    }
  }
};

export default durationValidator;

export const equal_To_Or_Bigger_Than_Toadys_Date = (untrimedDate: Date) => {
  const date: string = untrimedDate?.toString()?.trim();
  if (date === null || date === undefined) {
    return false;
  } else {
    let dateYear = date.split("-")[0];
    let dateMonth = Number(date.split("-")[1]) - 1;
    let dateDayOfTheMonth = date.split("-")[2];

    let currentYear = `${new Date().getFullYear()}`;
    let currentMonth = `${new Date().getMonth()}`;
    let currentDayOfTheMonth = `${new Date().getDate()}`;

    if (!isValidDate(untrimedDate)) {
      return false;
    } else {
      //start comparing year
      if (Number(dateYear) > Number(currentYear)) {
        return true;
      } else {
        if (Number(dateYear) < Number(currentYear)) {
          return false;
        } else {
          if (Number(dateYear) === Number(currentYear)) {
            //start comparing months
            if (Number(dateMonth > Number(currentMonth))) {
              return true;
            } else {
              if (Number(dateMonth < Number(currentMonth))) {
                return false;
              } else {
                if (Number(dateMonth) === Number(currentMonth)) {
                  // start comparing days
                  if (
                    Number(dateDayOfTheMonth) >= Number(currentDayOfTheMonth)
                  ) {
                    return true;
                  } else {
                    if (
                      Number(dateDayOfTheMonth) < Number(currentDayOfTheMonth)
                    ) {
                      return false;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export const isValidDate = (untrimedDate: Date) => {
  const date = untrimedDate?.toString()?.trim();
  let dateYear: string = date.split("-")[0];
  let dateMonth: number = Number(date.split("-")[1]);
  let dateDayOfTheMonth: number = Number(date.split("-")[2]);

  if (
    !Number(dateYear) ||
    !Number(dateMonth) ||
    !Number(dateDayOfTheMonth) ||
    dateYear?.length !== 4 ||
    String(dateYear)?.startsWith("0") ||
    Number(dateMonth) > 12 ||
    Number(dateMonth <= 0) ||
    String(dateMonth)?.length !== 2 ||
    dateDayOfTheMonth > 31 ||
    Number(dateDayOfTheMonth <= 0) ||
    String(dateDayOfTheMonth)?.length !== 2
  ) {
    return false;
  } else {
    return true;
  }
};

export const convertMonthTo_ALPHABETS = (
  date: Intl.DateTimeFormatPartTypes
) => {
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  for (var i = 0; i <= months.length; i++) {
    if (months[i] === months[Number(date.split("-")[1])]) {
      return `${date?.split("-")[0]}-${months[i - 1]}-${date?.split("-")[2]}`;
    }
  }
};

export const convertMonthTo_NUMBERS = (date: Date) => {
  var passedDate: string = date.toString()?.trim();
  let newDate: string = "";
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  for (var i = 0; i <= months.length; i++) {
    if (months[i] === passedDate.split("-")[1]) {
      newDate = passedDate.replace(
        passedDate.split("-")[1],
        Number(i + 1).toString()
      );
    }
  }

  if (newDate.split("-")[1].length === 1) {
    return `${newDate.split("-")[0]}-0${newDate.split("-")[1]}-${
      newDate.split("-")[2]
    }`;
  } else return newDate;
};
