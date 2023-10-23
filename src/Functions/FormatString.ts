export const formatProperNoun = (wordOrName: string) => {
  if (
    !wordOrName ||
    wordOrName === "" ||
    wordOrName === " " ||
    wordOrName === null ||
    wordOrName === undefined
  ) {
    if (wordOrName === "" || wordOrName === " ") return wordOrName.trim();
    return wordOrName;
  } else {
    let formatedNoun: string = "";
    let firstLetter: string = "";
    let noun: string = wordOrName;
    for (var i = 0; i <= noun.length; i++) {
      if (i === 0) {
        firstLetter = noun[i].toUpperCase();
      } else if (i !== noun.length) {
        formatedNoun = formatedNoun + noun[i].toLowerCase();
      }

      if (i === noun.length) {
        if (formatedNoun === undefined) {
          return firstLetter;
        } else {
          return firstLetter + formatedNoun.trim();
        }
      }
    }
  }
};

export const formatFullName = (fullname: string) => {
  if (!fullname || fullname === null || fullname === undefined) {
    if (fullname === "" || fullname === " ") return fullname.trim();
    return fullname;
  } else {
    let formatedFullName: string = "";
    let isNotBlankValue: Array<string> = [];

    if (fullname.split(" ").length < 2) {
      return false;
    } else {
      for (var i = 0; i < fullname.split(" ").length; i++) {
        if (fullname.split(" ")[i] !== "") {
          isNotBlankValue.push(fullname.split(" ")[i]);
        }
      }

      if (isNotBlankValue.length < 2) {
        return false;
      } else {
        for (i = 0; i <= isNotBlankValue.length; i++) {
          if (i !== isNotBlankValue.length) {
            let name: string = isNotBlankValue[i];
            let firstCharacter: string = name.slice(0, 1).toUpperCase();
            let OtherCharacters: string = name
              .slice(1, name.length)
              .toLowerCase();
            let newName: string = firstCharacter + OtherCharacters;

            formatedFullName = formatedFullName + " " + newName.trim();
          }
          if (i === isNotBlankValue.length) {
            return formatedFullName.trim();
          }
        }
      }
    }
  }
};

export const formatEmail = (email: string) => {
  if (email === "" || email === null || email === undefined) {
    if (email === "" || email === " ") return email.trim();
    return email;
  } else {
    if (email.split("@").length !== 2) {
      return false;
    } else {
      if (
        UnallowedEmailSymbols(email.split("@")[1]) ||
        UnallowedEmailSymbols(email.split("@")[0])
      ) {
        return false;
      } else {
        if (email.split("@")[1].split(".").length <= 1) {
          return false;
        } else {
          if (
            email.split("@")[1].split(".")[1] === "" ||
            email.split("@")[1].split(".")[0] === ""
          ) {
            return false;
          } else {
            if (email.endsWith(".")) {
              return false;
            } else {
              return true;
            }
          }
        }
      }
    }
  }
};

const UnallowedEmailSymbols = (phrase: string) => {
  if (
    phrase.includes("~") ||
    phrase.includes("!") ||
    phrase.includes("#") ||
    phrase.includes("$") ||
    phrase.includes("%") ||
    phrase.includes("^") ||
    phrase.includes("&") ||
    phrase.includes("*") ||
    phrase.includes("(") ||
    phrase.includes(")") ||
    phrase.includes("_") ||
    phrase.includes("=") ||
    phrase.includes("+") ||
    phrase.includes("?") ||
    phrase.includes("/") ||
    phrase.includes(">") ||
    phrase.includes(",") ||
    phrase.includes("<") ||
    phrase.includes("|") ||
    phrase.includes("@")
  ) {
    return true;
  } else return false;
};

export function createPathname(username) {
  if (
    username === null ||
    username === undefined ||
    username === "" ||
    username.length <= 0
  ) {
    return false;
  } else {
    if (username.split(" ")?.length < 2) {
      return username;
    } else if (username?.split(" ")?.length >= 2) {
      let usernameInUrl = "";
      for (var i = 0; i < username?.split(" ")?.length; i++) {
        usernameInUrl = usernameInUrl + "-" + username?.split(" ")[i];
      }

      if (usernameInUrl !== "") {
        return usernameInUrl
          ?.trim()
          ?.slice(1, usernameInUrl?.trim()?.length)
          ?.toLowerCase();
      } else {
        return null;
      }
    }
  }
}

export const replaceWhiteSpaceWithDash = (username: string) => {
  if (
    username === null ||
    username === undefined ||
    username === "" ||
    username.length <= 0
  ) {
    return "";
  } else {
    if (username.split(" ")?.length < 2) {
      return username;
    } else if (username?.split(" ")?.length >= 2) {
      let usernameInUrl: string = "";
      for (var i = 0; i < username?.split(" ")?.length; i++) {
        usernameInUrl = usernameInUrl + "_" + username?.split(" ")[i];
      }

      if (usernameInUrl !== "") {
        return usernameInUrl?.trim()?.slice(1, usernameInUrl?.trim()?.length);
      }
    }
    return "";
  }
};
