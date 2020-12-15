const getResult = (data) => {
  // parse the password string
  const passwords = data.split(/\r?\n/).map(parsePassword);

  return {
    numValidOldPasswordPolicy: getNumValidOldPasswordPolicy(passwords),
    numValidNewPasswordPolicy: getNumValidNewPasswordPolicy(passwords),
  };
};

const parsePassword = (password) => {
  const passwordParts = password.split(" ");
  return {
    rule: {
      character: passwordParts[1].replace(":", ""),
      lowCharacter: passwordParts[0].split("-")[0],
      upperCharacter: passwordParts[0].split("-")[1],
    },
    password: passwordParts[2],
  };
};

const getNumberOfOccurences = (str, character) => {
  let count = -1;
  let startIndex = -1;
  do {
    startIndex = str.indexOf(character, startIndex + 1);
    count++;
  } while (startIndex !== -1);

  return count;
};

function getNumValidNewPasswordPolicy(passwords) {
  // get number of time character in correct position
  const correctPositionCounts = passwords.map(getCorrectPositionCount);
  return correctPositionCounts.filter((p) => p === 1).length;
}

function getCorrectPositionCount(password) {
  let count = 0;
  if (
    password.password[password.rule.lowCharacter - 1] ===
    password.rule.character
  ) {
    count++;
  }
  if (
    password.password[password.rule.upperCharacter - 1] ===
    password.rule.character
  ) {
    count++;
  }
  return count;
}

function getNumValidOldPasswordPolicy(passwords) {
  // add the number of occurences of the password rule character
  const passwordWithOccurences = passwords.map((p) => ({
    ...p,
    characterOccurences: getNumberOfOccurences(p.password, p.rule.character),
  }));

  // get the password that pass the rule
  const validPasswords = passwordWithOccurences.filter(
    (p) =>
      p.characterOccurences >= p.rule.lowCharacter &&
      p.characterOccurences <= p.rule.upperCharacter
  );

  // return the count of successful passwords
  return validPasswords.length;
}

export default getResult;
