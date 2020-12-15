const Get2NumbersThatSum2020 = (expenseArray) => {
  let firstIndex = 0;
  let result = null;
  while (!result && firstIndex < expenseArray.length - 1) {
    let secondIndex = firstIndex + 1;
    while (!result && secondIndex < expenseArray.length) {
      if (expenseArray[firstIndex] + expenseArray[secondIndex] === 2020) {
        result = [expenseArray[firstIndex], expenseArray[secondIndex]];
      }
      secondIndex++;
    }
    firstIndex++;
  }
  return result;
};

const GetResult = (expenses) => {
  // turn string into array of numbers
  const expenseArray = expenses
    .split(/\r?\n/)
    .map((d) => parseInt(d))
    .filter((d) => !isNaN(d));

  const expenseItems = Get2NumbersThatSum2020(expenseArray);

  // multiply them
  const result = expenseItems ? expenseItems[0] * expenseItems[1] : null;

  return { expenseItems, result };
};

export default GetResult;
