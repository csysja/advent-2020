const GetNumbersThatSum2020 = (
  expenseArray,
  numberOfNumbers,
  currentIndex = 0,
  currentNumbers = []
) => {
  let result = null;
  // loop through each number
  while (!result && currentIndex < expenseArray.length - numberOfNumbers + 1) {
    const newCurrentNumbers = [...currentNumbers, expenseArray[currentIndex]];
    if (numberOfNumbers === 1) {
      // down to 1 number so time to see if sum 2020
      if (newCurrentNumbers.reduce((p, c) => p + c) === 2020) {
        result = newCurrentNumbers;
      }
    } else {
      // recursively call to get next number
      result = GetNumbersThatSum2020(
        expenseArray,
        numberOfNumbers - 1,
        currentIndex + 1,
        newCurrentNumbers
      );
    }
    currentIndex++;
  }
  return result;
};

const GetProductOfNumbersThatSum2020 = (expenseArray, numberOfNumbers) => {
  // find numberOfNumbers that add up to 2020
  const expenseItems = GetNumbersThatSum2020(expenseArray, numberOfNumbers);
  // multiply them all togther
  const result = expenseItems ? expenseItems.reduce((a, b) => a * b) : null;
  return { expenseItems, result };
};

const getResult = (expenses) => {
  // turn string into array of numbers
  const expenseArray = expenses
    .split(/\r?\n/)
    .map((d) => parseInt(d))
    .filter((d) => !isNaN(d));

  return {
    twoItemsSum2020: GetProductOfNumbersThatSum2020(expenseArray, 2),
    threeItemsSum2020: GetProductOfNumbersThatSum2020(expenseArray, 3),
  };
};

export default getResult;
