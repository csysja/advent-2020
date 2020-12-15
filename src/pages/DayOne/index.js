import { useState, useEffect } from "react";

import testData from "./testData";
import finalData from "./finalData";
import GetResult from "./GetResult";

const DayOne = () => {
  const [data, setData] = useState(testData);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setResult(GetResult(data));
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
      {result?.expenseItems && (
        <p>
          The two matching expense items are <em>{result.expenseItems[0]}</em>{" "}
          and <em>{result.expenseItems[1]}</em>.
        </p>
      )}
      {result?.result && (
        <p>
          The result of multiplying these together is <em>{result.result}</em>.
        </p>
      )}
    </article>
  );
};

export default DayOne;
