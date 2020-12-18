import React, { useState, useEffect, useCallback } from "react";

import testData from "./testData";
import finalData from "./finalData";

const DaySix = () => {
  const [data, setData] = useState(testData);
  const [result, setResult] = useState(null);
  const [showGroup, setShowGroup] = useState(false);

  const getQuestions = useCallback(() => {
    let result = [];
    for (let i = 97; i < 123; i++) {
      result.push(String.fromCharCode(i));
    }
    return result;
  }, []);

  useEffect(() => {
    const lines = data.split(/\r?\n/);
    const questions = getQuestions();
    const groups = lines.reduce(
      (p, c) => {
        if (c === "") {
          // empty so new group
          p.push([]);
        } else {
          p[p.length - 1].push(c); // keep adding to current group
        }
        return p;
      },
      [[]]
    );
    const groupsWithQuestions = groups.map((group) => ({
      group,
      questionsAllYes: questions.reduce(
        (questionArray, currentQuestion) =>
          group.every((person) => person.includes(currentQuestion))
            ? [...questionArray, currentQuestion]
            : questionArray,
        []
      ),
      questionsSomeYes: questions.reduce(
        (questionArray, currentQuestion) =>
          group.some((person) => person.includes(currentQuestion))
            ? [...questionArray, currentQuestion]
            : questionArray,
        []
      ),
    }));
    setResult({
      totalAllYesCount: groupsWithQuestions.reduce(
        (currentCount, group) => currentCount + group.questionsAllYes.length,
        0
      ),
      totalSomeYesCount: groupsWithQuestions.reduce(
        (currentCount, group) => currentCount + group.questionsSomeYes.length,
        0
      ),
      groupsWithQuestions,
    });
  }, [data, getQuestions]);

  return (
    <article>
      <h2>Day 6</h2>
      <a href="https://adventofcode.com/2020/day/6">brief</a>
      <p>
        Would you like to use the{" "}
        <button onClick={() => setData(testData)}>test</button> or{" "}
        <button onClick={() => setData(finalData)}>final</button> data...
      </p>
      <p>
        The sum of questions where <em>some</em> in the group answered yes is{" "}
        <em>{result?.totalSomeYesCount}</em>.
      </p>
      <p>
        The sum of questions where <em>all</em> in the group answered yes is{" "}
        <em>{result?.totalAllYesCount}</em>.
      </p>
      <p>
        <button onClick={() => setShowGroup((showGroup) => !showGroup)}>
          toggle show group
        </button>
      </p>
      <table>
        <thead>
          <tr>
            <th>group number</th>
            {showGroup && <th>group</th>}
            <th>
              questions <em>some</em> answered yes
            </th>
            <th>
              questions <em>all</em> answered yes
            </th>
          </tr>
        </thead>
        <tbody>
          {result?.groupsWithQuestions?.map((group, i) => (
            <tr key={group.group}>
              <td>{i + 1}</td>
              {showGroup && <td>{group.group.join(",")}</td>}
              <td>{group.questionsSomeYes}</td>
              <td>{group.questionsAllYes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
};

export default DaySix;
