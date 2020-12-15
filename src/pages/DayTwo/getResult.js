const getResult = (data) => {
  // parse the password string
  const passwords = data.split(/\r?\n/).map(parsePassword);

  // add the number of occurences of the password rule character
  const passwordWithOccurences = passwords.map((p) => ({
    ...p,
    characterOccurences: getNumberOfOccurences(p.password, p.rule.character),
  }));

  // get the password that pass the rule
  const validPasswords = passwordWithOccurences.filter(
    (p) =>
      p.characterOccurences >= p.rule.minCharacters &&
      p.characterOccurences <= p.rule.maxCharacters
  );

  // return the count of successful passwords
  return validPasswords.length;
};

const parsePassword = (password) => {
  const passwordParts = password.split(" ");
  return {
    rule: {
      character: passwordParts[1].replace(":", ""),
      minCharacters: passwordParts[0].split("-")[0],
      maxCharacters: passwordParts[0].split("-")[1],
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

export default getResult;
