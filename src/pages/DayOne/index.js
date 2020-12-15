import { useState, useEffect } from "react";

import testData from "./testData";
import finalData from "./finalData";
import getResult from "./getResult";

const DayOne = () => {
  const [data, setData] = useState(testData);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setResult(getResult(data));
  }, [data]);
  return (
    <article>
      <h2>Day 1</h2>
      <a href="https://adventofcode.com/2020/day/1">brief</a>
      <p>
        Would you like to use the{" "}
        <button onClick={() => setData(testData)}>test</button> or{" "}
        <button onClick={() => setData(finalData)}>final</button> data...
      </p>
      <p>
        <textarea
          rows="7"
          cols="10"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </p>
      {result?.twoItemsSum2020 && (
        <p>
          Two items that sum 2020 are{" "}
          <em>{result.twoItemsSum2020.expenseItems[0]}</em> and{" "}
          <em>{result.twoItemsSum2020.expenseItems[1]}</em> which multiplied
          together is <em>{result.twoItemsSum2020.result}</em>.
        </p>
      )}
      {result?.threeItemsSum2020 && (
        <p>
          Three items that sum 2020 are{" "}
          <em>{result.threeItemsSum2020.expenseItems[0]}</em>,{" "}
          <em>{result.threeItemsSum2020.expenseItems[1]}</em> and{" "}
          <em>{result.threeItemsSum2020.expenseItems[2]}</em> which multiplied
          together is <em>{result.threeItemsSum2020.result}</em>.
        </p>
      )}
    </article>
  );
};

export default DayOne;
