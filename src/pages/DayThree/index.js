import React, { useState, useEffect } from "react";

import testData from "./testData";
import finalData from "./finalData";

const DayThree = () => {
  const [data, setData] = useState(testData);
  const [slope, setSlope] = useState({ right: 3, down: 1 });
  const [result, setResult] = useState(null);
  const [finalResult, setFinalResult] = useState(null);
  const [showTextArea, setShowTextArea] = useState(false);

  const repeatText = (text, times) => {
    let result = "";
    for (let index = 0; index < times; index++) {
      result += text;
    }
    return result;
  };

  const calculateSlope = (data, slope) => {
    const lines = data.split(/\r?\n/); // split by new line
    const xMovementPerLine = (slope.right * 1.0) / slope.down; // move in x for each line
    const requiredWidth = lines.length * xMovementPerLine; // calculate how wide needs to fit slope
    const numberOfRepeats = Math.ceil((requiredWidth * 1.0) / lines[0].length); // calculate how many repeats this width is
    const result = lines
      .map((line) => repeatText(line, numberOfRepeats)) // repeat in x to fit slope
      .map((line, i) => {
        // don't show first line or lines that are skipped because down is greater than 0 (eg don't show line when when going down by 2)
        if (i === 0 || i % slope.down !== 0) {
          return line;
        }
        const xPos = Math.floor(xMovementPerLine * i);
        const newChar = line[xPos] === "#" ? "X" : "O"; // mark when hit tree with X
        return (
          // build a new string with the new character
          line.substr(0, xPos) + newChar + line.substr(xPos + 1)
        );
      });
    return {
      rows: result.length,
      cols: result[0].length,
      grid: result.join("\r\n"),
      numOfTrees: result.filter((r) => r.includes("X")).length, // calculate num tree hits
    };
  };

  useEffect(() => {
    const result = calculateSlope(data, slope);
    setResult(result);
  }, [data, slope]);

  useEffect(() => {
    let treeHits = [];
    treeHits.push(calculateSlope(data, { right: 1, down: 1 }).numOfTrees);
    treeHits.push(calculateSlope(data, { right: 3, down: 1 }).numOfTrees);
    treeHits.push(calculateSlope(data, { right: 5, down: 1 }).numOfTrees);
    treeHits.push(calculateSlope(data, { right: 7, down: 1 }).numOfTrees);
    treeHits.push(calculateSlope(data, { right: 1, down: 2 }).numOfTrees);
    console.log(treeHits);
    setFinalResult(treeHits.reduce((p, c) => p * c));
  }, [data]);

  return (
    <article>
      <h2>Day 3</h2>
      <a href="https://adventofcode.com/2020/day/3">brief</a>
      <p>
        Show <button onClick={() => setData(testData)}>test</button> or{" "}
        <button onClick={() => setData(finalData)}>final</button> data.
      </p>
      <p>
        The final result for all the slopes multiplied together is{" "}
        <em>{finalResult}</em>.
      </p>
      <p>
        <em>{result?.numOfTrees}</em> trees hit for slope right {slope.right}{" "}
        down {slope.down}.{" "}
        <button onClick={() => setShowTextArea((t) => !t)}>
          toggle textarea
        </button>{" "}
        to show this slope. You can switch to a different slope
        <ul>
          <li>
            <button onClick={() => setSlope({ right: 1, down: 1 })}>
              right 1 down 1
            </button>
          </li>
          <li>
            <button onClick={() => setSlope({ right: 3, down: 1 })}>
              right 3 down 1
            </button>
          </li>
          <li>
            <button onClick={() => setSlope({ right: 5, down: 1 })}>
              right 5 down 1
            </button>
          </li>
          <li>
            <button onClick={() => setSlope({ right: 7, down: 1 })}>
              right 7 down 1
            </button>
          </li>
          <li>
            <button onClick={() => setSlope({ right: 1, down: 2 })}>
              right 1 down 2
            </button>
          </li>
        </ul>
      </p>
      {result && showTextArea && (
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
