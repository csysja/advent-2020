import React, { useState, useEffect } from "react";

import testData from "./testData";
import finalData from "./finalData";

const DayThree = () => {
  const [data, setData] = useState(testData);
  const [result, setResult] = useState(null);

  const repeatText = (text, times) => {
    let result = "";
    for (let index = 0; index < times; index++) {
      result += text;
    }
    return result;
  };

  useEffect(() => {
    if (data) {
      const lines = data.split(/\r?\n/);
      const requiredWidth = lines.length * 3;
      const numberOfRepeats = Math.ceil(
        (requiredWidth * 1.0) / lines[0].length
      );
      const result = lines
        .map((line) => repeatText(line, numberOfRepeats))
        .map((line, i) => {
          if (i === 0) {
            return line;
          }
          const newChar = line[i * 3] === "#" ? "X" : "O";
          return line.substr(0, i * 3) + newChar + line.substr(i * 3 + 1);
        });
      setResult({
        rows: result.length,
        cols: result[0].length,
        grid: result.join("\r\n"),
        numOfTrees: result.filter((r) => r.includes("X")).length,
      });
    }
  }, [data]);

  return (
    <article>
      <h2>Day 3</h2>
      <a href="https://adventofcode.com/2020/day/3">brief</a>
      <p>
        Would you like to use the{" "}
        <button onClick={() => setData(testData)}>test</button> or{" "}
        <button onClick={() => setData(finalData)}>final</button> data...
      </p>
      <p>
        The number of trees <em>{result?.numOfTrees}</em>
      </p>
      {result && (
        <textarea
          rows={result.rows}
          cols={result.cols}
          value={result.grid}
          readOnly
        />
      )}
    </article>
  );
};

export default DayThree;
