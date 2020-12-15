import React, { useState, useEffect } from "react";

import testData from "./testData";
import finalData from "./finalData";
import getResult from "./getResult";

const DayTwo = () => {
  const [data, setData] = useState(testData);
  const [result, setResult] = useState(null);

  useEffect(() => {
    setResult(getResult(data));
  }, [data]);
  return (
    <article>
      <h2>Day 2</h2>
      <a href="https://adventofcode.com/2020/day/2">brief</a>
      <p>
        Would you like to use the{" "}
        <button onClick={() => setData(testData)}>test</button> or{" "}
        <button onClick={() => setData(finalData)}>final</button> data...
      </p>
      <p>
        <textarea
          rows="10"
          cols="50"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
      </p>
      <p>
        The number of valid passwords is{" "}
        <em>{result?.numValidOldPasswordPolicy}</em> in the old job password
        policy
      </p>
      <p>
        The number of valid passwords is{" "}
        <em>{result?.numValidNewPasswordPolicy}</em> in the current job password
        policy
      </p>
    </article>
  );
};

export default DayTwo;
